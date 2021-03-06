import { Component } from '@angular/core';
import { BdAddRemoveButtonComponent } from '../bd-add-remove-button';

@Component({
  selector: 'bd-add-button',
  styleUrls: ['../bd-add-remove-button/bd-add-remove-button.component.scss'],
  templateUrl: '../bd-add-remove-button/bd-add-remove-button.component.html'
})
export class BdAddButtonComponent extends BdAddRemoveButtonComponent {
  protected iconClass = 'icon-plus';
}
