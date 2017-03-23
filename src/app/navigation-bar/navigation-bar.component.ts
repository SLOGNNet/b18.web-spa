import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { SwitchState } from '../shared/enums/switchState';

@Component({
    selector: 'navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: [
        './navigation-bar.component.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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
    {
        label: 'Drivers',
        icon: 'icon',
        link: '/drivers',
        items: [{
            label: 'Drivers',
            link: '/drivers'
          }, {
          label: 'New Driver',
          link: '/drivers/0/edit'
        }]
    },
    {
        label: 'Loads',
        icon: 'icon',
        link: '/loads',
        items: [{
            label: 'Loads',
            link: '/loads'
          }, {
          label: 'New Load',
          link: '/loads/0'
        }]
    }, {
        label: 'Companies',
        icon: 'icon',
        link: '/companies',
        items: [{
              label: 'Companies',
              link: '/companies'
          }, {
          label: 'New Company',
          link: '/companies/0/edit-info'
        }]
    },
    {
        label: 'Equipment',
        icon: 'icon',
        link: '/equipment'
    }];

    onSwitchStateChange(switchState: SwitchState) {
        this.switchStateChange.emit(switchState);
    }
}
