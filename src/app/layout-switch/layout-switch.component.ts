import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'layout-switch',
    templateUrl: './layout-switch.component.html',
    styleUrls: [
        './layout-switch.component.scss'
    ]
})

export class LayoutSwitchComponent {
    @Input() switchState: number = 0;
    @Output() switchStateChange: EventEmitter<any>  = new EventEmitter();

    isActive(switchButtonState: number) {
        return !!(this.switchState & switchButtonState);
    }

    onSwithcChange(switchButton) {
        if (switchButton.classList.contains('active')) {
            this.switchState -= switchButton.value;
        } else {
            this.switchState += switchButton.value;
        }

        this.switchStateChange.emit(this.switchState);
    }
}
