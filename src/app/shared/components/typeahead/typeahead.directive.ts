import {
  ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output,
  ReflectiveInjector, Renderer, TemplateRef, ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadOptions } from './typeahead-options.class';
import { TypeaheadUtils } from './typeahead-utils';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { ComponentsHelper } from '../utils/components-helper.service';
import { TypeaheadMatch } from './typeahead-match.class';

/* tslint:disable-next-line */
const KeyboardEvent = (global as any).KeyboardEvent as KeyboardEvent;

@Directive({
  /* tslint:disable */
  selector: '[typeahead][ngModel],[typeahead][formControlName]'
  /* tslint:enable */
})
export class TypeaheadDirective implements OnInit {
  @Output() public typeaheadLoading: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() public typeaheadNoResults: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() public typeaheadOnSelect: EventEmitter<TypeaheadMatch> = new EventEmitter<TypeaheadMatch>(false);
  @Output() public typeaheadFooterClick: EventEmitter<void> = new EventEmitter<void>(false);

  @Input() public typeahead: any;
  @Input() public typeaheadMinLength: number = void 0;
  @Input() public typeaheadWaitMs: number;
  @Input() public typeaheadOptionsLimit: number;
  @Input() public typeaheadOptionField: string;
  @Input() public typeaheadAsync: boolean = void 0;
  @Input() public typeaheadItemTemplate: TemplateRef<any>;
  @Input() public typeaheadFooterTemplate: TemplateRef<any>;
  @Input() public typeaheadLoaderTemplate: TemplateRef<any>;
  public container: TypeaheadContainerComponent;
  public isLoading: boolean = false;

  protected keyUpEventEmitter: EventEmitter<any> = new EventEmitter();
  protected _matches: Array<TypeaheadMatch> = [];
  protected placement: string = 'bottom-left';
  protected popup: ComponentRef<TypeaheadContainerComponent>;
  protected typeaheadUtils: TypeaheadUtils;

  protected ngControl: NgControl;
  protected viewContainerRef: ViewContainerRef;
  protected element: ElementRef;
  protected renderer: Renderer;

  @HostListener('keyup', ['$event'])
  public onChange(e: any): void {
    if (this.container) {
      // esc
      if (e.keyCode === 27) {
        this.hide();
        return;
      }

      // up
      if (e.keyCode === 38) {
        this.container.prevActiveMatch();
        return;
      }

      // down
      if (e.keyCode === 40) {
        this.container.nextActiveMatch();
        return;
      }

      // enter
      if (e.keyCode === 13) {
        this.container.selectActiveMatch();
        return;
      }
    }

    // For `<input>`s, use the `value` property. For others that don't have a
    // `value` (such as `<span contenteditable="true">`, use `innerText`.
    const value = e.target.value !== undefined ? e.target.value : e.target.innerText;
    if (value.trim().length >= this.typeaheadMinLength) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit(e.target.value);
    } else {
      this.typeaheadLoading.emit(false);
      this.typeaheadNoResults.emit(false);
      this.hide();
    }
  }

  @HostListener('focus')
  public onFocus(): void {
    if (this.typeaheadMinLength === 0) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit('');
    }
  }

  @HostListener('blur')
  public onBlur(): void {
    if (this.container && !this.container.isFocused) {
      this.hide();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(e: KeyboardEvent): void {
    // no container - no problems
    if (!this.container) {
      return;
    }

    // if items is visible - prevent form submition
    if (e.keyCode === 13) {
      e.preventDefault();
      return;
    }

    // if tab default browser behavior will select next input field, and therefore we should close the items list
    if (e.keyCode === 9) {
      this.hide();
      return;
    }
  }

  public constructor(control: NgControl, viewContainerRef: ViewContainerRef, element: ElementRef,
    renderer: Renderer, typeaheadUtils: TypeaheadUtils,
    private _changeDetectionRef: ChangeDetectorRef) {
    this.element = element;
    this.ngControl = control;
    this.viewContainerRef = viewContainerRef;
    this.renderer = renderer;
    this.typeaheadUtils = typeaheadUtils;
    this.typeaheadLoading.subscribe(value => {
      this.show();
      this.isLoading = value;
    });
  }

  public ngOnInit(): void {
    this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
    this.typeaheadMinLength = this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
    this.typeaheadWaitMs = this.typeaheadWaitMs || 0;

    // async should be false in case of array
    if (this.typeaheadAsync === undefined && !(this.typeahead instanceof Observable)) {
      this.typeaheadAsync = false;
    }

    if (this.typeahead instanceof Observable) {
      this.typeaheadAsync = true;
    }

    if (this.typeaheadAsync) {
      this.asyncActions();
    } else {
      this.syncActions();
    }
  }

  public changeModel(match: TypeaheadMatch): void {
    let valueStr: string = match.value;
    this.ngControl.viewToModelUpdate(valueStr);
    (this.ngControl.control as FormControl).setValue(valueStr);
    this.hide();
  }

  public get matches(): Array<any> {
    return this._matches;
  }

  public show(): void {
    if (this.container) {
      return;
    }

    let options = new TypeaheadOptions({
      typeaheadRef: this,
      placement: this.placement,
      animation: false
    });

    let binding = ReflectiveInjector.resolve([
      { provide: TypeaheadOptions, useValue: options }
    ]);

    this.popup = this.typeaheadUtils
      .appendNextToLocation(TypeaheadContainerComponent, this.viewContainerRef, binding);

    this.popup.instance.position(this.viewContainerRef.element);
    this.container = this.popup.instance;
    this.container.parent = this;
    this.container.query = this.normalizeQuery(this.ngControl.control.value);
    this.container.matches = this._matches;
    this.element.nativeElement.focus();
  }

  public hide(): void {
    if (this.container) {
      this.popup.destroy();
      this.container = void 0;
    }
  }

  protected asyncActions(): void {
    this.keyUpEventEmitter
      .debounceTime(this.typeaheadWaitMs)
      .mergeMap(() => this.typeahead)
      .subscribe(
      (matches: any[]) => {
        this.finalizeAsyncCall(matches);
      },
      (err: any) => {
        console.error(err);
      }
      );
  }

  protected syncActions(): void {
    this.keyUpEventEmitter
      .debounceTime(this.typeaheadWaitMs)
      .mergeMap((value: string) => {
        let normalizedQuery = this.normalizeQuery(value);

        return Observable.from(this.typeahead)
          .filter((option: any) => {
            return option && this.testMatch(this.normalizeOption(option), normalizedQuery);
          })
          .toArray();
      })
      .subscribe(
      (matches: any[]) => {
        this.finalizeAsyncCall(matches);
      },
      (err: any) => {
        console.error(err);
      }
      );
  }

  protected normalizeOption(option: any): any {
    let optionValue: string = this.typeaheadUtils.getValueFromObject(option, this.typeaheadOptionField);
    return optionValue.toLowerCase();
  }

  protected normalizeQuery(value: string): any {
    let normalizedQuery: any = value
      .toString()
      .toLowerCase();
    return normalizedQuery;
  }

  protected testMatch(match: string, test: string): boolean {
    return match.indexOf(test) >= 0;
  }

  protected finalizeAsyncCall(matches: any[]): void {
    this.prepareMatches(matches);

    this.typeaheadLoading.emit(false);
    this.typeaheadNoResults.emit(!this.hasMatches());

    if (this.container) {
      this.container.query = this.ngControl.control.value.toString().toLowerCase();
      this.container.matches = this._matches;
    } else {
      this.show();
    }
    
    this._changeDetectionRef.detectChanges();
  }

  protected prepareMatches(options: any[]): void {

    let limited: any[] = options.slice(0, this.typeaheadOptionsLimit);
    this._matches = limited.map((option: any) =>
      new TypeaheadMatch(
        option,
        this.typeaheadUtils.getValueFromObject(option, this.typeaheadOptionField)));
  }

  protected hasMatches(): boolean {
    return this._matches.length > 0;
  }
}
