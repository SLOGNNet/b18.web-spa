/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { SwitchState } from './shared/enums/SwitchState';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.scss'
    ],
    template: `
      <navigation-bar [class.slide]="isSlided()"
        [switchState]="switchState"
        (switchStateChange)="updateSwitchState($event)">
      </navigation-bar>

      <main>
        <router-outlet></router-outlet>
      </main>
    `
})
export class AppComponent {
    private switchState: number = SwitchState.ALL;

    constructor(
        public appState: AppState,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.updateSwitchState(params['switchState']);
            });
    }

    isSlided() {
        return !!(this.switchState & 1);
    }

    updateSwitchState(newSwitchState) {
        this.switchState = parseInt(newSwitchState, 10) >= 0 ? parseInt(newSwitchState, 10) : this.switchState;

        this.router.navigate(
            [location.pathname],
            {
                queryParams: {
                    'switchState': this.switchState
                }
            }
        );
    }
}
