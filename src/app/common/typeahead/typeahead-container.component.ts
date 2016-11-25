import { Component, ElementRef, TemplateRef, ViewEncapsulation } from '@angular/core';
import { positionService } from 'ng2-bootstrap/ng2-bootstrap';
import { TypeaheadOptions } from './typeahead-options.class';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';

const template = `
  <ul class="dropdown-menu"
      [ngStyle]="{top: top, left: left, display: 'block'}"
      (mouseleave)="focusLost()">
    <template ngFor let-match let-i="index" [ngForOf]="matches">
      <li
        [class.active]="isActive(match)"
        (mouseenter)="selectActive(match)">
        <a href="#"
           *ngIf="!itemTemplate"
           (click)="selectMatch(match, $event)"
           tabindex="-1"
           [innerHtml]="hightlight(match, query)"></a>
        <a href="#"
           *ngIf="itemTemplate"
           (click)="selectMatch(match, $event)"
           tabindex="-1">
            <template [ngTemplateOutlet]="itemTemplate"
                      [ngOutletContext]="{item: match.item, index: i}">
            </template>
        </a>
      </li>
    </template>
  </ul>
`;

@Component({
  selector: 'typeahead-container',
  template: template,
  encapsulation: ViewEncapsulation.None
})
export class TypeaheadContainerComponent {
  public parent: TypeaheadDirective;
  public query: any;
  public element: ElementRef;
  public isFocused: boolean = false;
  public top: string;
  public left: string;
  public display: string;

  protected _active: TypeaheadMatch;
  protected _matches: Array<TypeaheadMatch> = [];
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

  public set matches(value: Array<TypeaheadMatch>) {
    this._matches = value;

    if (this._matches.length > 0) {
      this._active = this._matches[0];
    }
  }

  public position(hostEl: ElementRef): void {
    this.top = '0px';
    this.left = '0px';
    let p = positionService
      .positionElements(hostEl.nativeElement,
      this.element.nativeElement.children[0],
      this.placement, false);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
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
