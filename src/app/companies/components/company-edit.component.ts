import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Company } from '../../models';
import { BaseEditComponent } from '../../base';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyActions } from '../../actions';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../store';
import { Location } from '@angular/common';
import { CompanyForm } from '../../forms';

@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyEditComponent extends BaseEditComponent<Company> {
  @Input() disabled: boolean = false;
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
    router: Router,
    ngRedux: NgRedux<IAppState>) {
      super(companyActions, ngRedux.select(state => state.companies.selected), 
        ngRedux.select(state => state.companies.isLoading), route, router, location);
  }
}
