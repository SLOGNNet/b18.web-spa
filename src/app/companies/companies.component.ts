import { Component } from '@angular/core';
import { Company } from '../models';
import { CompanyActions } from '../actions';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '../base';
import { NgRedux } from 'ng2-redux';
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
