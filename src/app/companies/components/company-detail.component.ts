import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Company } from '../../models';
import { BaseDetailComponent } from '../../base';
import {  ActivatedRoute, Params } from '@angular/router';
import { CompanyActions } from '../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../store';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent extends BaseDetailComponent<Company> {
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

  constructor(
    companyActions: CompanyActions,
    route: ActivatedRoute,
    ngRedux: NgRedux<IAppState>) {
      super(companyActions, ngRedux.select(state => state.companies.selected), route);
  }
}
