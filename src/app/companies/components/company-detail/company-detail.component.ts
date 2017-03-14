import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Company } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CompanyActions } from '../../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../../store';
import { CompanyForm } from '../../../forms';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent extends BaseDetailComponent<Company> {

 private anchors = [{
    id: 'company-personal-information',
    title: 'Information'
  }];

  constructor(
    private cdr: ChangeDetectorRef,
    companyActions: CompanyActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
      super(companyActions, ngRedux.select(state => state.companies.selected), router, route);
  }
}
