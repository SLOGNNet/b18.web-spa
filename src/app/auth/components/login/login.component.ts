import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  formViewMode: ViewMode;
  queryParams: any;
  private subscription: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.formViewMode = ViewMode.Edit;
    this.subscription = this.route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
