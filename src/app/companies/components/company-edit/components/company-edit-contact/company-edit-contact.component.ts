import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, Company } from '../../../../../models';
import { BaseEditComponent } from '../../../../../base';
import { CompanyContactActions } from '../../../../../actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../../store';
import { ContactForm } from '../../../../../forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'company-edit-contact',
  templateUrl: './company-edit-contact.component.html',
  styleUrls: ['./company-edit-contact.component.scss']
})
export class CompanyEditContactComponent extends BaseEditComponent<Contact>{
  @ViewChild(ContactForm) companyContactFormComponent: ContactForm;
  private locations$;
  private selectedCompany: Company;
  private contactForm: FormGroup;
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
    super(companyContactActions, ngRedux.select(state => state.contacts.selected),
      ngRedux.select(state => state.contacts.isLoading), route, router, location, cdr);
    this.selected$.subscribe(item => {
      this.resetForm();
    });
    this.ngRedux.select(state => state.companies.selected).subscribe(selected => {
      this.selectedCompany = selected;

      if (selected) {
        this.locations = selected.locations;
      } else {
        this.locations = [];
      }

      this.resetForm();
    });
  }

  resetForm() {
    this.contactForm = this.formBuilder.group({});
    this.cdr.markForCheck();
  }

  isDetailsChanged() {
    return this.companyContactFormComponent && this.companyContactFormComponent.contactForm.dirty;
  }

  onSave() {
    if (this.contactForm.valid) {
      const changedItem = cloneDeep(this.contactForm.value);

      if (this.isNew) {
        this.isNew = false;
        this.actions.addChild(this.selectedCompany, changedItem);
      } else {
        this.actions.update(changedItem);
      }
    }
  }
}
