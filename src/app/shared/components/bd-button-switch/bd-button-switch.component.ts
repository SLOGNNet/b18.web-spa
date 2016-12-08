import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-button-switch',
  styleUrls: ['./bd-button-switch.component.scss'],
  templateUrl: './bd-button-switch.component.html'
})
export class BdButtonSwitchComponent {

  @Input() labelText: string;
  @Input() items: any[];
  @Input() activeItemIndex: any;

  private _value: any;

  set value(v: any){
    this._value = v;
  }
  get value(): any{
    return this._value;
  }

  ngAfterViewInit(){
    this.value = this.activeItemIndex;
  }

  private isActive(element) {
    return element === this.activeItemIndex;
  }

  private _handleItemClick(event, index){
    this.activeItemIndex = index;
    this.value = event.target.getAttribute('value');
  }

}
