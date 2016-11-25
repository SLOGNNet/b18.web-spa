import { Component, Input, EventEmitter, HostBinding, forwardRef } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const BD_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CommonDropdownComponent),
  multi: true
};

@Component({
  selector: 'bd-dropdown',
  styleUrls: ['bd-dropdown.component.scss'],
  templateUrl: './bd-dropdown.component.html',
  providers: [BD_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CommonDropdownComponent implements ControlValueAccessor {

ngOnInit(){
  console.log(DropdownModule);
}

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  public items:Array<string> = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

}
