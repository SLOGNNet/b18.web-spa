import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, Company } from '../../../../../models';
import { BaseNestedEditComponent } from '../../../../../base';
import { CompanyContactActions } from '../../../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, selectDetailCompany, selectDetailContact } from '../../../../../store';
import { ContactForm } from '../../../../../forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'company-edit-contact',
  templateUrl: './company-edit-contact.component.html',
  styleUrls: ['./company-edit-contact.component.scss']
})
export class CompanyEditContactComponent extends BaseNestedEditComponent<Contact, Company>{
  protected segment = 'edit-contact';
  @ViewChild(ContactForm) companyContactFormComponent: ContactForm;
  private locations$;
  private selectedCompany: Company;
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
    companyContactActions: CompanyContactActions,
    route: ActivatedRoute,
    location: Location,
    router: Router,
    private ngRedux: NgRedux<IAppState>) {
    super(companyContactActions, ngRedux.select(selectDetailCompany), ngRedux.select(selectDetailContact),
      ngRedux.select(state => state.ui.contacts.isLoading), route, router, location, cdr);
  }

  get fullName() {
    return [this.selectedItem.firstName, this.selectedItem.middleName, this.selectedItem.lastName].filter(v => v).join(' ');
  }

  isDetailsChanged() {
    return this.companyContactFormComponent && this.companyContactFormComponent.contactForm.dirty;
  }

  onFormSave() {
    if (this.companyContactFormComponent.contactForm.valid) {
      this.companyContactFormComponent.contactForm.markAsPristine();
      super.onItemSave(this.companyContactFormComponent.contactForm.value);
    } else {
      this.companyContactFormComponent.validate();
    }
  }

  getItemName() {
    return this.isNew ? 'Company' : this.fullName;
  }
}
