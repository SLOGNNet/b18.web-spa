import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as AngularCommon from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, Location } from '../../../../../models';
import { BaseNestedEditComponent } from '../../../../../base';
import { CompanyLocationActions } from '../../../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, selectDetailCompany, selectDetailLocation } from '../../../../../store';
import { LocationForm } from '../../../../../forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'company-edit-lcoation',
  templateUrl: './company-edit-location.component.html',
  styleUrls: ['./company-edit-location.component.scss']
})
export class CompanyEditLocationComponent extends BaseNestedEditComponent<Location, Company>{
  protected segment = 'edit-location';

  private locations$;
  private form: FormGroup = this.formBuilder.group({});
  private selectedLocation: Location;
  private locations: Array<any>;
  private anchors = [{
    id: '',
    title: 'Basic information'
  }, {
    id: '',
    title: 'Adresses'
  }, {
    id: 'company-contact-edit',
    title: 'Contacts'
  }];

  constructor(
    cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    companyLocationActions: CompanyLocationActions,
    route: ActivatedRoute,
    location: AngularCommon.Location,
    router: Router,
    private ngRedux: NgRedux<IAppState>) {
    super(companyLocationActions, ngRedux.select(selectDetailCompany), ngRedux.select(selectDetailLocation),
      ngRedux.select(state => state.ui.locations.isLoading), route, router, location, cdr);
  }

  isDetailsChanged() {
    return this.form && this.form.dirty;
  }

  onFormSave() {
    if (this.form.valid) {
      this.form.markAsPristine();
      super.onItemSave(this.form.value);
    }
  }

  getItemName() {
    return 'Location';
  }
}
