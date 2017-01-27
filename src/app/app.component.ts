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
      <button (click)="addToast()">add toast</button>
      <top-panel></top-panel>
        <div class="main-content">
          <router-outlet></router-outlet>
        <bd-toast-manager [notification]="notification"></bd-toast-manager>
        </div>
      </main>
    `
})
export class AppComponent {
  private switchState: number = SwitchState.All;
  private switchStateEnum: any = SwitchState;
  private queryParams: any;
  private notification;
  private counter = 0;

  constructor(
    public appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private notificationService: NotificationService,
    private location: Location) {
    notificationService.get().subscribe(notif => {
      // this.notification = notif;
    });
    this.ngRedux.configureStore(
      rootReducer, {}, []);
  }

  addToast() {
    this.notification = this.getNotification();
  }
    private getNotification(): Notification {
    const notification: Notification = {
      id: new Date().getTime(),
      content: 'Lorem ipsum ' + this.counter++,
      type: NotificationType.Error
    };

    return notification;
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
