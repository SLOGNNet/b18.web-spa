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

  private _scrollTo(id, index) {
    if (id && id.length && id.trim().length) {
      let targetAnchor = document.querySelector(`[id=${id}]`);

      if (targetAnchor && targetAnchor.scrollIntoView) {
        targetAnchor.scrollIntoView();
        this._activeAnchor = index;
      }
    }
  }
}
