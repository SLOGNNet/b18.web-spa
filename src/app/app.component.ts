/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IAppState, rootReducer } from './store';
import { SwitchState } from './shared/enums/switchState';
import { Notification, NotificationType } from './models';
import {
  applyMiddleware,
  Store,
  combineReducers,
  compose,
  createStore
} from 'redux';
import { AppState } from './app.service';
import { NgRedux } from 'ng2-redux';
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
        <bd-toast-manager [notifications]="notif"></bd-toast-manager>
      </main>
    `
})
export class AppComponent {
  private switchState: number = SwitchState.All;
  private switchStateEnum: any = SwitchState;
  private queryParams: any;
  private notif = [];
  private _notifications: Array<Notification> = [{
    id: 1,
    content: '1',
    type: NotificationType.Error
  }, {
    id: 2,
    content: '2',
    type: NotificationType.Error
  }, {
    id: 3,
    content: '3',
    type: NotificationType.Error
  }];
  private _notifications1: Array<Notification> = [{
    id: 4,
    content: '4',
    type: NotificationType.Error
  }, {
    id: 5,
    content: '5',
    type: NotificationType.Error
  }, {
    id: 6,
    content: '6',
    type: NotificationType.Error
  }];

  constructor(
    public appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private location: Location) {
    this.ngRedux.configureStore(
      rootReducer, {}, []);
  }

  ngOnInit() {
    this.appState.set('switchState', this.switchState);
    this.route
      .queryParams
      .subscribe(params => {
        this.queryParams = params;
        this.updateSwitchState(params['switchState']);
      });

    setTimeout(() => this.notif = [{
      id: 1,
      content: '1',
      type: NotificationType.Error
    }], 3000);

    setTimeout(() => this.notif = [{
      id: 2,
      content: '2',
      type: NotificationType.Error
    }], 7000);

    setTimeout(() => this.notif = [{
      id: 3,
      content: '3',
      type: NotificationType.Error
    }], 8000);

    setTimeout(() => this.notif = [{
      id: 4,
      content: '4',
      type: NotificationType.Error
    }], 11000);

    setTimeout(() => this.notif = [{
      id: 5,
      content: '5',
      type: NotificationType.Error
    }], 13000);
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

    this.forceRender();
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

  forceRender() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }
}
