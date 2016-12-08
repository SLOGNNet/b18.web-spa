import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-form-switch',
  templateUrl: './bd-form-switch.component.html'
})
export class BdFormSwitchComponent {

  @Input() labelText: string;
  @Input() items: any[];
  @Input() selectedValue: any;
  @Input() enableButtonSwitch: boolean;

}
