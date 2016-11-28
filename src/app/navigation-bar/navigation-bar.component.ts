import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: [
        './navigation-bar.component.scss'
    ]
})

export class NavigationBarComponent {
    @Input() switchState: number;
    @Output() switchStateChange: EventEmitter<any>  = new EventEmitter();

    onSwitchStateChange(switchState) {
        this.switchStateChange.emit(switchState);
    }
}
