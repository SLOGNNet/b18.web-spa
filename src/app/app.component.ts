/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from './shared';
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
import { AuthenticationService } from './auth';
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
                      *ngIf="isLoggedIn"
                      [switchState]="switchState"
                      (switchStateChange)="updateSwitchState($event)">
      </navigation-bar>
      <main [ngClass]="{'auth-content': !isLoggedIn}">
        <top-panel *ngIf="isLoggedIn"></top-panel>
        <div class="main-content">
          <router-outlet></router-outlet>
          <bd-toast-manager [notification]="notification" *ngIf="isLoggedIn"></bd-toast-manager>
        </div>
      </main>
    `
})
export class AppComponent {
  isLoggedIn: boolean;
  private switchState: number = SwitchState.All;
  private switchStateEnum: any = SwitchState;
  private queryParams: any;
  private notification;

  constructor(
    public appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private location: Location) {
    notificationService.notification.subscribe(notif => {
      this.notification = notif;
    });
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
    this.isLoggedIn = this.authenticationService.isLoggedIn();
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
