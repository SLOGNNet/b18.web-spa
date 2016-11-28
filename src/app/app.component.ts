/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
      <navigation-bar [class.slide]="isSlided()"
        [switchState]="switchState"
        (switchStateChange)="updateSwitchState($event)">
      </navigation-bar>

      <div class="content" [class.slide]="isSlided()">
        <router-outlet></router-outlet>
      </div>
    `
})
export class AppComponent {
  private switchState: number = 8;;

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
    this.switchState = parseInt(newSwitchState) >= 0 ? parseInt(newSwitchState) : this.switchState;

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
