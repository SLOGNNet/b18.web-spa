/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
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
        return !!(this.switchState & SwitchState.MenuVisible);
    }

    updateSwitchState(switchState) {
        const newSwitchState = parseInt(switchState, 10);

        if (isFinite(newSwitchState) && (newSwitchState <= this.switchStateEnum.All)) {
            this.switchState = newSwitchState;

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
}
