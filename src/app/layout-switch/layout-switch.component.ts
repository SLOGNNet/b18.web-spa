import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SwitchState } from '../shared/enums/switchState';

@Component({
    selector: 'layout-switch',
    templateUrl: './layout-switch.component.html',
    styleUrls: [
        './layout-switch.component.scss'
    ]
})

export class LayoutSwitchComponent {
    @Input() switchState: SwitchState = SwitchState.AllSlotsVisible;
    @Output() switchStateChange: EventEmitter<any> = new EventEmitter();

    private switchStateEnum: any = SwitchState;

    isActive(switchButtonState = SwitchState.AllSlotsVisible) {
        return !!(this.switchState & switchButtonState);
    }

    onSwitchChange(switchButton, state) {
        if (switchButton.classList.contains('active')) {
            this.switchState &= ~state;
        } else {
            this.switchState |= state;
        }

        this.switchStateChange.emit(this.switchState);
    }
}
