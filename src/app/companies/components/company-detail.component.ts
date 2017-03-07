import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Company } from '../../models';
import { BaseDetailComponent } from '../../base';
import { ActivatedRoute, Params } from '@angular/router';
import { CompanyActions } from '../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../store';
import { Location } from '@angular/common';
import { CompanyForm } from '../../forms';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent extends BaseDetailComponent<Company> {
  @ViewChild(CompanyForm) companyFormComponent: CompanyForm;
  private anchors = [{
    id: 'company-basic-information',
    title: 'Basic information'
  }, {
    id: 'company-addresses',
    title: 'Adresses'
  }, {
    id: 'company-contacts',
    title: 'Contacts'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }, {
    id: '',
    title: 'Link'
  }];


  isDetailsChanged() {
    return this.companyFormComponent && this.companyFormComponent.companyForm.dirty;
  }
  constructor(
    private cdr: ChangeDetectorRef,
    companyActions: CompanyActions,
    route: ActivatedRoute,
    location: Location,
    ngRedux: NgRedux<IAppState>) {
      super(companyActions, ngRedux.select(state => state.companies.selected), ngRedux.select(state => state.companies.isLoading), route, location);
  }

}
