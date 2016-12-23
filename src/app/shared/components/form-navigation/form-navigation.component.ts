import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'form-navigation',
  templateUrl: './form-navigation.component.html',
  styleUrls: ['./form-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormNavigationComponent {
  private _activeAnchor: number = null;

  @Input() title: string = "";
  @Input() anchors: Array<Object>;

  scrollTo(value, index) {
    if (value.length && value.trim().length) {
      let linkElement = document.querySelectorAll(`[anchor=${value}]`);

      if (linkElement.length) {
        linkElement[0].scrollIntoView();
        this._activeAnchor = index;
      }
    }
  }
}
