import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from '../shared';
import { SwitchState } from '../shared/enums/switchState';
import { AppState } from '../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private switchState: number = SwitchState.All;
  private switchStateEnum: any = SwitchState;
  private queryParams: any;
  private notification;

  constructor(
    public appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private location: Location) {
    notificationService.notification.subscribe(notif => {
      this.notification = notif;
    });
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
