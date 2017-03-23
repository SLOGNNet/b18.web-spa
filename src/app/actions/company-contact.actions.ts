import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Company, Contact } from '../models';
import { ContactService, CompanyService, NotificationService } from '../shared';
import { IDetailDataActions, INestedEditDataActions } from './intefaces';
import { CompanyActions } from './company.actions';

@Injectable()
export class CompanyContactActions implements IDetailDataActions<Contact>, INestedEditDataActions<Contact, Company> {
  static ADD_COMPANY_CONTACT_REQUEST: string = 'ADD_COMPANY_CONTACT_REQUEST';
  static ADD_COMPANY_CONTACT_SUCCESS: string = 'ADD_COMPANY_CONTACT_SUCCESS';
  static UPDATE_COMPANY_CONTACT_REQUEST: string = 'UPDATE_COMPANY_CONTACT_REQUEST';
  static UPDATE_COMPANY_CONTACT_SUCCESS: string = 'UPDATE_COMPANY_CONTACT_SUCCESS';
  static UPDATE_COMPANY_CONTACT_FAILURE: string = 'UPDATE_COMPANY_CONTACT_FAILURE';
  static SELECT_COMPANY_CONTACT: string = 'SELECT_COMPANY_CONTACT';
  constructor(
    private contactService: ContactService,
    private companyActions: CompanyActions,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) { }

  addAssociation(contact: Contact, company: Company): void {
    this.ngRedux.dispatch({ type: CompanyContactActions.ADD_COMPANY_CONTACT_REQUEST, contact });
    this.contactService.create(company, contact).subscribe(newId => {
      const prevId = contact.id;
      contact.id = newId;
      this.ngRedux.dispatch({ type: CompanyContactActions.ADD_COMPANY_CONTACT_SUCCESS, contact, prevId});
      this.notificatonService.sendNotification('Contact created.', `${contact.firstName} was created.`);
    });
  }

  updateAssociation(contact: Contact, company: Company): void {
    this.ngRedux.dispatch({ type: CompanyContactActions.UPDATE_COMPANY_CONTACT_REQUEST, contact });

    setTimeout(() => {
      this.contactService.update(contact);
      this.ngRedux.dispatch({ type: CompanyContactActions.UPDATE_COMPANY_CONTACT_SUCCESS, contact });
      this.notificatonService.sendNotification('Contact updated.', `${contact.id} was updated.`);
    }, 3000);
  }

  select(contactId: string): void {
    this.contactService.getDetails(contactId).subscribe(contact => {
      this.ngRedux.dispatch({ type: CompanyContactActions.SELECT_COMPANY_CONTACT, contact });
    });
  }

  createNew(): void {
    this.ngRedux.dispatch({ type: CompanyContactActions.SELECT_COMPANY_CONTACT, contact: Contact.create() });
  }
}
