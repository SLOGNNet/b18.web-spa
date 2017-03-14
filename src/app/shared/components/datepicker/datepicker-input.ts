import {
  Directive,
  Input,
  ComponentRef,
  ElementRef,
  ViewContainerRef,
  Renderer,
  ComponentFactoryResolver,
  NgZone,
  TemplateRef,
  forwardRef,
  EventEmitter,
  Output,
  Optional
} from '@angular/core';
import { isEqual } from 'lodash';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NgControl } from '@angular/forms';

import { NgbDate } from './ngb-date';
import { NgbDatepicker, NgbDatepickerNavigateEvent } from './datepicker';
import { DayTemplateContext } from './datepicker-day-template-context';
import { NgbDateParserFormatter } from './ngb-date-parser-formatter';

import { positionElements } from '../../helpers/positioning';
import { NgbDateStruct } from './ngb-date-struct';
import { NgbDatepickerService } from './datepicker-service';

/**
 * A directive that makes it possible to have datepickers on input fields.
 * Manages integration with the input field itself (data entry) and ngModel (validation etc.).
 */
@Directive({
  selector: 'bd-input[ngbDatepicker], input[ngbDatepicker]',
  exportAs: 'ngbDatepicker',
  host: { '(change)': 'manualDateChange($event.target.value)',
    '(keyup.esc)': 'close()',
    '(blur)': 'onBlur()'
  }
})
export class NgbInputDatepicker {
  /**
   * Reference for the custom template for the day display
   */
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;

  /**
   * Number of months to display
   */
  @Input() displayMonths: number;

  /**
   * First day of the week. With default calendar we use ISO 8601: 1=Mon ... 7=Sun
   */
  @Input() firstDayOfWeek: number;

  /**
   * Callback to mark a given date as disabled.
   * 'Current' contains the month that will be displayed in the view
   */
  @Input() markDisabled: (date: NgbDateStruct, current: { year: number, month: number }) => boolean;

  /**
   * Min date for the navigation. If not provided will be 10 years before today or `startDate`
   */
  @Input() minDate: NgbDateStruct;

  /**
   * Max date for the navigation. If not provided will be 10 years from today or `startDate`
   */
  @Input() maxDate: NgbDateStruct;

  /**
   * Navigation type: `select` (default with select boxes for month and year), `arrows`
   * (without select boxes, only navigation arrows) or `none` (no navigation at all)
   */
  @Input() navigation: 'select' | 'arrows' | 'none';

  /**
   * The way to display days that don't belong to current month: `visible` (default),
   * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
   */
  @Input() outsideDays: 'visible' | 'collapsed' | 'hidden';

  /**
   * Whether to display days of the week
   */
  @Input() showWeekdays: boolean;

  /**
   * Whether to display week numbers
   */
  @Input() showWeekNumbers: boolean;

  /**
   * Date to open calendar with.
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided, calendar will open with current month.
   * Use 'navigateTo(date)' as an alternative
   */
  @Input() startDate: { year: number, month: number };

  /**
   * Input string format
   */
  @Input() format: string = 'YYYY-MM-DD';
  /**
   * An event fired when navigation happens and currently displayed month changes.
   * See NgbDatepickerNavigateEvent for the payload info.
   */
  @Output() navigate = new EventEmitter<NgbDatepickerNavigateEvent>();

  private _cRef: ComponentRef<NgbDatepicker> = null;
  private _model: NgbDate = null;
  private _zoneSubscription: any;

  constructor(
    @Optional() private _control: NgControl,
    private _parserFormatter: NgbDateParserFormatter,
    private _elRef: ElementRef, private _vcRef: ViewContainerRef,
    private _renderer: Renderer, private _cfr: ComponentFactoryResolver, private ngZone: NgZone,
    private _service: NgbDatepickerService) {
    this._zoneSubscription = ngZone.onStable.subscribe(() => {
      if (this._cRef) {
        positionElements(this._elRef.nativeElement, this._cRef.location.nativeElement, 'bottom-left');
      }
    });
  }

  ngOnInit(): void {
    if (this._control) {
      this.writeValue(this._control.value);
      this._control.valueChanges.subscribe( value => {
        this.writeValue(value);
      });
    }
  }

  writeValue(value) {
    if (this._isValueChanged(value)) {
      const newModel =
        value ? this._service.toValidDate(this._parserFormatter.parse(value, this.format), null) : null;
      this._model = newModel;
      this._writeModelValue(this._model);
    }
  }

  manualDateChange(value: string) {
    this._model = this._service.toValidDate(this._parserFormatter.parse(value, this.format), null);
    this._writeModelValue(this._model);
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setElementProperty(this._elRef.nativeElement, 'disabled', isDisabled);
    if (this.isOpen()) {
      this._cRef.instance.setDisabledState(isDisabled);
    }
  }

  isOpen() { return !!this._cRef; }

  /**
   * Opens the datepicker with the selected date indicated by the ngModel value.
   */
  open() {
    if (!this.isOpen()) {
      const cf = this._cfr.resolveComponentFactory(NgbDatepicker);
      this._cRef = this._vcRef.createComponent(cf);

      this._applyPopupStyling(this._cRef.location.nativeElement);
      this._cRef.instance.writeValue(this._model);
      this._applyDatepickerInputs(this._cRef.instance);
      this._subscribeForDatepickerOutputs(this._cRef.instance);
      this._cRef.instance.ngOnInit();

      // date selection event handling
      this._cRef.instance.registerOnChange((selectedDate) => {
        this._onDateChange(selectedDate);
        this.close();
      });

      this._cRef.instance.onNavigateSelect.subscribe((selectedDate) => {
        this._onDateChange(selectedDate);
      });
    }
  }

  /**
   * Closes the datepicker popup.
   */
  close() {
    if (this.isOpen()) {
      this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
      this._cRef = null;
    }
  }

  /**
   * Toggles the datepicker popup (opens when closed and closes when opened).
   */
  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Navigates current view to provided date.
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided calendar will open current month.
   * Use 'startDate' input as an alternative
   */
  navigateTo(date?: { year: number, month: number }) {
    if (this.isOpen()) {
      this._cRef.instance.navigateTo(date);
    }
  }

  onBlur() {}

  private _isValueChanged(newValue: string): boolean{
    newValue = newValue || '';
    const value = this._parserFormatter.format(this._model, this.format);
    const isChanged = !isEqual(value, newValue);
    return isChanged;
  }

  private _applyDatepickerInputs(datepickerInstance: NgbDatepicker): void {
    ['dayTemplate', 'displayMonths', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'navigation',
      'outsideDays', 'showNavigation', 'showWeekdays', 'showWeekNumbers']
      .forEach((optionName: string) => {
        if (this[optionName] !== undefined) {
          datepickerInstance[optionName] = this[optionName];
        }
      });
    datepickerInstance.startDate = this.startDate || this._model;
  }

  private _applyPopupStyling(nativeElement: any) {
    this._renderer.setElementClass(nativeElement, 'dropdown-menu', false);
    this._renderer.setElementClass(nativeElement, 'ngb-datepicker-popup-container', true);
  }

  private _subscribeForDatepickerOutputs(datepickerInstance: NgbDatepicker) {
    datepickerInstance.navigate.subscribe(date => this.navigate.emit(date));
  }

  private _writeModelValue(model: NgbDate) {
    const value = this._parserFormatter.format(model, this.format);
    if (this._control) {
      this._control.viewToModelUpdate(value);
      (this._control.control as FormControl).setValue(value);
    }
    if (this.isOpen()) {
      this._cRef.instance.writeValue(model);
    }
  }

  private _onDateChange(date) {
    this._model =
      date ? this._service.toValidDate({year: date.year, month: date.month, day: date.day}, null) : null;
    this._writeModelValue(this._model);
  }
}
