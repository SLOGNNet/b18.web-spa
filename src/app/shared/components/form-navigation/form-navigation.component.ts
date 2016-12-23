import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'form-navigation',
  templateUrl: './form-navigation.component.html',
  styleUrls: ['./form-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormNavigationComponent {
  @Input() title: string = '';
  @Input() anchors: Array<Object>;

  private _activeAnchor: number = null;
  private _scrollTo(value, index) {
    if (value.length && value.trim().length) {
      let linkElement = document.querySelectorAll(`[anchor=${value}]`);

      if (linkElement.length) {
        linkElement[0].scrollIntoView();
        this._activeAnchor = index;
      }
    }
  }
}
