import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SwitchState } from '../shared/enums/SwitchState';

@Component({
    selector: 'layout-switch',
    templateUrl: './layout-switch.component.html',
    styleUrls: [
        './layout-switch.component.scss'
    ]
})

export class LayoutSwitchComponent {
    @Input() switchState: SwitchState = SwitchState.ALL;
    @Output() switchStateChange: EventEmitter<any> = new EventEmitter();

    private switchStateEnum = SwitchState;

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();
    }

    isActive(switchButtonState: SwitchState) {
        return !!(this.switchState & switchButtonState);
    }

    onSwitchChange(switchButton) {
        if (switchButton.classList.contains('active')) {
            this.switchState &= ~switchButton.state;
        } else {
            this.switchState |= switchButton.state;
        }

        this.switchStateChange.emit(this.switchState);
    }
}
