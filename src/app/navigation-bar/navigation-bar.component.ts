import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SwitchState } from '../shared/enums/SwitchState';

@Component({
    selector: 'navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: [
        './navigation-bar.component.scss'
    ]
})

export class NavigationBarComponent {
    @Input() switchState: SwitchState;
    @Output() switchStateChange: EventEmitter<any>  = new EventEmitter();

    onSwitchStateChange(switchState: SwitchState) {
        this.switchStateChange.emit(switchState);
    }
}
