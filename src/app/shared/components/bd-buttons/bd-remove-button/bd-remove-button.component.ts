import { Component, Input } from '@angular/core';
import { BdAddRemoveButtonComponent } from '../bd-add-remove-button';

@Component({
  selector: 'bd-remove-button',
  styleUrls: ['../bd-add-remove-button/bd-add-remove-button.component.scss'],
  templateUrl: '../bd-add-remove-button/bd-add-remove-button.component.html'
})
export class BdRemoveButtonComponent extends BdAddRemoveButtonComponent {
  protected iconUrl = 'assets/img/minus.svg';
}
