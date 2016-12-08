import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-button-switch',
  styleUrls: ['./bd-button-switch.component.scss'],
  templateUrl: './bd-button-switch.component.html'
})
export class BdButtonSwitchComponent {

  @Input() labelText: string;
  @Input() items: any[];

  @Input() set selectedValue(v: any) {
        this._selectedValue = v;
  }
  get selectedValue(): any {
    return this._selectedValue;
  }

  private _selectedValue: any;

  private isActive(element) {
    return element === this.selectedValue;
  }

  private _handleItemClick(event){
    this.selectedValue = event.target.getAttribute('value');
  }

}
