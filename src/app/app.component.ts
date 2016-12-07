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
  private switchState: number = SwitchState.All;
  private switchStateEnum: any = SwitchState;
  private queryParams: any;

  constructor(
    public appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.appState.set('switchState', this.switchState);
    this.route
      .queryParams
      .subscribe(params => {
        this.queryParams = params;
        this.updateSwitchState(params['switchState']);
      });
  }

  isSlided() {
    return !(this.switchState & SwitchState.MenuVisible);
  }

  updateSwitchState(newSwitchStateParam) {
    const newSwitchState = this.parseSwitchState(newSwitchStateParam);
    if (newSwitchState === this.switchState) {
      return;
    }
    this.switchState = newSwitchState;
    this.appState.set('switchState', this.switchState);
    const url = this.getRoutePath();
    const params = this.getQueryParams(newSwitchState);
    this.router.navigate(
      [url], {
        queryParams: params
      }
    );
  }

  getQueryParams(switchState) {
    const params = Object.assign({}, this.queryParams);
    if (switchState === this.switchStateEnum.All) {
      delete params.switchState;
    }
    else {
      params.switchState = switchState;
    }
    return params;
  }

  parseSwitchState(value) {
    let result = this.switchStateEnum.All;
    const parsedValue = parseInt(value, 10);
    if (isFinite(parsedValue) && (parsedValue <= this.switchStateEnum.All)) {
      result = parsedValue;
    }
    return result;
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
