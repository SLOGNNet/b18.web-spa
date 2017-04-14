import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Load } from '../../../../../models';
import { LoadActions } from '../../../../../actions';
import { BaseRootEditComponent } from '../../../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState, selectDetailLoad } from '../../../../../store';
import { Location } from '@angular/common';
import { LoadFormComponent } from '../../../../../forms';

@Component({
  selector: 'load-edit-customer',
  templateUrl: './load-edit-customer.component.html'
})
export class LoadEditCustomerComponent extends BaseRootEditComponent<Load> {
  @ViewChild(LoadFormComponent) loadFormComponent: LoadFormComponent;
  private anchors = [{
    id: 'customer-view',
    title: 'Customer'
  }];

  constructor(
    cdr: ChangeDetectorRef,
    loadActions: LoadActions,
    route: ActivatedRoute,
    router: Router,
    location: Location,
    ngRedux: NgRedux<IAppState>) {
      super(loadActions, ngRedux.select(selectDetailLoad),
        ngRedux.select(state => state.ui.loads.isLoading), route, router, location, cdr);
  }

  isDetailsChanged() {
    return this.loadFormComponent && this.loadFormComponent.loadForm.dirty;
  }

  getItemName() {
    return 'Customer';
  }

  onAddStop() {

  }
}
