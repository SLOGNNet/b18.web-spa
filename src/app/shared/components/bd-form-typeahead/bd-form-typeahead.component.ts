import { Component, ElementRef, TemplateRef, ViewEncapsulation, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { positionService } from 'ng2-bootstrap/ng2-bootstrap';
import { TypeaheadOptions } from './typeahead-options.class';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bd-typeahead',
  templateUrl: './bd-form-typeahead.component.html',
  styleUrls: ['./bd-form-typeahead.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BdFormTypeaheadComponent {
  @Input() public itemTemplate: TemplateRef<any>;
  @Input() public labelText: string = '';
  @Input() public footerButtonText: string = '';
  @Input() public source: Observable<any>;
  @Input() public optionField: string;
  @Input() value: string;
  @Output() public onSelect: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() public valueChange = new EventEmitter();
  @Output() public onRemove: EventEmitter<any> = new EventEmitter();
  protected isLoading: boolean = false;
  protected isNoResultsShown: boolean = false;

  changeValue(v: any) {
    this.value = v;
    this.valueChange.emit(v);
  }

  public changeTypeaheadLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  public changeTypeaheadNoResults(isNoResultsShown: boolean): void {
    this.isNoResultsShown = isNoResultsShown;
  }

  public typeaheadOnSelect(match): void {
    this.onSelect.emit(match.item);
  }

  remove(event): void {
    this.value = '';
    event.stopPropagation();
    this.onRemove.emit(event);
  }

  public onFooterClick(): void {
  }
}
