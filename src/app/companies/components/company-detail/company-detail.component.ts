import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Company } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyActions } from '../../../actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent extends BaseDetailComponent<Company> {

  constructor(
    cdr: ChangeDetectorRef,
    companyActions: CompanyActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
      super(companyActions, ngRedux.select(state => state.companies.selected), router, route, cdr);
  }
}
