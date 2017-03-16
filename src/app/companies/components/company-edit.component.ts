import { Component, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Company } from '../../models';
import { BaseEditComponent } from '../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyActions } from '../../actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';
import { Location } from '@angular/common';
import { CompanyForm } from '../../forms';

@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html'
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
  }];

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

  isDetailsChanged() {
    return this.companyFormComponent && this.companyFormComponent.companyForm.dirty;
  }
}
