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

    private items = [
    //   {
    //     label: 'Home',
    //     icon: 'icon',
    //     items: [{
    //         label: 'Sub menu',
    //         link: './home'
    //     }, {
    //         label: 'Sub menu1',
    //         link: './home',
    //         hidden: true
    //     }, {
    //         label: 'Sub menu',
    //         link: './home',
    //     }]
    // },
    // {
    //     label: 'Drivers',
    //     icon: 'icon',
    //     link: './drivers/1'
    // },
    {
        label: 'Loads',
        icon: 'icon',
        link: './loads'
    }, {
        label: 'Customers',
        icon: 'icon',
        link: './customers'
    }];

    onSwitchStateChange(switchState: SwitchState) {
        this.switchStateChange.emit(switchState);
    }
}
