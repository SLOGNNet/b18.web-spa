import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Customer } from '../models';
import { CustomerService } from '../shared';
import { ViewMode } from '../shared/enums';
import { cloneDeep } from 'lodash';
import { CustomerActions } from '../actions';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseListComponent } from '../base';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../store';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent extends BaseListComponent<Customer> {
    constructor(
      customerActions: CustomerActions,
      router: Router,
      route: ActivatedRoute,
      private ngRedux: NgRedux<IAppState>,
      cdr: ChangeDetectorRef) {
      super(customerActions, ngRedux.select(state => state.customers.items), router, route, cdr);
  }

  protected routePath(): string {
    return 'customers/';
  }

  private trackBy(index: number, customer: Customer) {
    return customer.id;
  }
}
