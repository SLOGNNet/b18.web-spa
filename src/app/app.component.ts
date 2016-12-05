/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SwitchState } from './shared/enums/switchState';

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
    private switchState: number = SwitchState.AllPanesVisible;
    private switchStateEnum: any = SwitchState;

    constructor(
        public appState: AppState,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location) {
    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.updateSwitchState(params['switchState']);
            });
    }

    isSlided() {
        return !!(this.switchState & SwitchState.MenuVisible);
    }

    updateSwitchState(switchState) {
        const newSwitchState = parseInt(switchState, 10);
        const newHref = this.getRoutePath();

        if (isFinite(newSwitchState) && (newSwitchState <= this.switchStateEnum.All)) {
            this.switchState = newSwitchState;
        }


        this.router.navigate(
            [newHref], {
                queryParams: {
                    'switchState': this.switchState
                }
            }
        );
    }

    getRoutePath() {
        const currentHref = this.location.path(false);
        const queryPosition = currentHref.indexOf('?');
        let result = '';

        if (queryPosition >= 0) {
            result = currentHref.substr(0, queryPosition);
        } else {
            result = currentHref;
        }

        return result;
    }
}
