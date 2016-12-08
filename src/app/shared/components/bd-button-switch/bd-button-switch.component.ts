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
      if ((<any>Object).values(this.items).includes(v)){
        this._selectedValue = v;
        this.value = this._selectedValue;
      }
  }
  get selectedValue(): any {
    return this._selectedValue;
  }

  private _value: any;
  private _selectedValue: any;

  set value(v: any){
    this._value = v;
  }
  get value(): any{
    return this._value;
  }

  ngAfterViewInit(){
    this.value = this.selectedValue;
  }

  private isActive(element) {
    return element === this.selectedValue;
  }

  private _handleItemClick(event){
    this.selectedValue = event.target.getAttribute('value');
  }

}
