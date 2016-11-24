import { Component, Input, EventEmitter, HostBinding, forwardRef } from '@angular/core';
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
export class CommonDropdownComponent implements ControlValueAccessor{


}
