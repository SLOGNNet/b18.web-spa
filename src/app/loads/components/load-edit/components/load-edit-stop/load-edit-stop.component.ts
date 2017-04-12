import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Stop, Load } from '../../../../../models';
import { BaseNestedEditComponent } from '../../../../../base';
import { StopActions } from '../../../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, selectDetailLoad, selectDetailStop } from '../../../../../store';
import { ContactForm } from '../../../../../forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'company-edit-contact',
  templateUrl: './company-edit-contact.component.html',
  styleUrls: ['./company-edit-contact.component.scss']
})
export class LoadEditStopComponent extends BaseNestedEditComponent<Stop, Load>{
  protected segment = 'edit-stop';
  @ViewChild(ContactForm) companyContactFormComponent: ContactForm;
  private locations$;
  private selectedLoad: Load;
  private locations: Array<any>;
  private anchors = [{
    id: '',
    title: 'Itinerary'
  }];

  constructor(
    cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    stopActions: StopActions,
    route: ActivatedRoute,
    location: Location,
    router: Router,
    private ngRedux: NgRedux<IAppState>) {
    super(stopActions, ngRedux.select(selectDetailLoad), ngRedux.select(selectDetailStop),
      ngRedux.select(state => state.ui.contacts.isLoading), route, router, location, cdr);
  }

  isDetailsChanged() {
    return this.companyContactFormComponent && this.companyContactFormComponent.contactForm.dirty;
  }

  onFormSave() {
    if (this.companyContactFormComponent.contactForm.valid) {
      this.companyContactFormComponent.contactForm.markAsPristine();
      super.onItemSave(this.companyContactFormComponent.contactForm.value);
    }
  }

  getItemName() {
    return 'Company';
  }
}
