import { Component, ElementRef, TemplateRef, ViewEncapsulation, OnInit } from '@angular/core';
import { positionService } from 'ng2-bootstrap/ng2-bootstrap';
import { TypeaheadOptions } from './typeahead-options.class';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';

@Component({
  selector: 'typeahead-container',
  templateUrl: './typeahead-container.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TypeaheadContainerComponent {
  public query: any;
  public element: ElementRef;
  public isFocused: boolean = false;
  public top: string;
  public left: string;
  public display: string;

  protected _active: TypeaheadMatch;
  protected _parent: TypeaheadDirective;
  protected _matches: Array<TypeaheadMatch> = [];
  protected isLoading: boolean = false;
  protected placement: string;

  public constructor(element: ElementRef, options: TypeaheadOptions) {
    this.element = element;
    Object.assign(this, options);
  }

  public get matches(): Array<TypeaheadMatch> {
    return this._matches;
  }

  public get itemTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.typeaheadItemTemplate : undefined;
  }

  public get footerTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.typeaheadFooterTemplate : undefined;
  }

  public get loaderTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.typeaheadLoaderTemplate : undefined;
  }

  public get showLoader() {
     console.log('showLoader', this.isLoading && this.loaderTemplate)
    return this.isLoading && this.loaderTemplate;
  }

  public set parent(value: TypeaheadDirective) {
    this._parent = value;
    debugger;
    this.subscribeOnLoad();
  }

  public get parent(): TypeaheadDirective {
    return this._parent;
  }

  public set matches(value: Array<TypeaheadMatch>) {
    this._matches = value;

    if (this._matches.length > 0) {
      this._active = this._matches[0];
    }
  }

  public position(hostEl: ElementRef): void {
    this.left = '0px';
    this.top = hostEl.nativeElement.offsetHeight;
  }

  public selectActiveMatch(): void {
    this.selectMatch(this._active);
  }

  public prevActiveMatch(): void {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index - 1 < 0
      ? this.matches.length - 1
      : index - 1];
  }

  public nextActiveMatch(): void {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index + 1 > this.matches.length - 1
      ? 0
      : index + 1];
  }

  protected selectActive(value: TypeaheadMatch): void {
    this.isFocused = true;
    this._active = value;
  }

  public focusLost(): void {
    this.isFocused = false;
  }

  public isActive(value: TypeaheadMatch): boolean {
    return this._active === value;
  }

  protected subscribeOnLoad(): void {
    if (this.parent) {
      this.parent.typeaheadLoading.subscribe(value => {
          debugger;
        this.isLoading = value;
      });
    }
  }

  protected selectMatch(value: TypeaheadMatch, e: Event = void 0): boolean {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.parent.changeModel(value);
    setTimeout(() =>
      this.parent.typeaheadOnSelect.emit(value), 0
    );
    return false;
  }
}
