import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, CompanyStatuses, CompanyTypes } from '../../../../../models';
import { BaseEditComponent } from '../../../../../base';
import { CompanyActions } from '../../../../../actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../../store';
import { CompanyInfoForm } from '../../../../../forms';

@Component({
  selector: 'company-edit-info',
  templateUrl: './company-edit-info.component.html',
  styleUrls: ['./company-edit-info.component.scss']
})
export class CompanyEditInfoComponent extends BaseEditComponent<Company>{
  @ViewChild(CompanyInfoForm) companyInfoFormComponent: CompanyInfoForm;
  private anchors = [{
    id: '',
    title: 'Basic information'
  }, {
    id: '',
    title: 'Adresses'
  }, {
    id: '',
    title: 'Contacts'
  }];

  constructor(
    companyActions: CompanyActions,
    route: ActivatedRoute,
    location: Location,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
    super(companyActions, ngRedux.select(state => state.companies.selected),
      ngRedux.select(state => state.companies.isLoading), route, router, location);
  }

  isDetailsChanged() {
    return this.companyInfoFormComponent && this.companyInfoFormComponent.companyForm.dirty;
  }
}
