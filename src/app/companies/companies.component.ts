import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Company } from '../models';
import { CompanyService } from '../shared';
import { ViewMode } from '../shared/enums';
import { cloneDeep } from 'lodash';
import { CompanyActions } from '../actions';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseListComponent } from '../base';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../store';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent extends BaseListComponent<Company> {
    constructor(
      companyActions: CompanyActions,
      router: Router,
      route: ActivatedRoute,
      private ngRedux: NgRedux<IAppState>) {
      super(companyActions, ngRedux.select(state => state.companies.items), router, route);
  }

  protected routePath(): string {
    return 'companies/';
  }

  private trackBy(index: number, company: Company) {
    return company.id;
  }
}
