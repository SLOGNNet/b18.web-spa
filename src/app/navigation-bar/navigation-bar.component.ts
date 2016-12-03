import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SwitchState } from '../shared/enums/switchState';

@Component({
    selector: 'navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: [
        './navigation-bar.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})

export class NavigationBarComponent {
    @Input() switchState: SwitchState;
    @Output() switchStateChange: EventEmitter<any> = new EventEmitter();

    private items = [{
        label: 'Home',
        icon: 'icon',
        hidden: false,
        items: [{
            label: 'Sub menu',
            link: './home',
            hidden: false
        }, {
            label: 'Sub menu',
            link: './home1',
            hidden: false
        }, {
            label: 'Sub menu',
            link: './home2',
            hidden: false
        }]
    }, {
        label: 'Drivers',
        icon: 'icon',
        link: './drivers/1',
        hidden: false
    }, {
        label: 'Load Form',
        icon: 'icon',
        link: './load-form',
        hidden: false
    }];

    onSwitchStateChange(switchState: SwitchState) {
        this.switchStateChange.emit(switchState);
    }
}
