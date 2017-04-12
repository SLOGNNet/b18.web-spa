import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Company, Contact, contactSchema } from '../models';
import { ContactService, CompanyService, NotificationService } from '../shared';
import { IDetailDataActions, INestedEditDataActions } from './intefaces';
import { CompanyActions } from './company.actions';
import { normalize } from 'normalizr';
import { createPeristEnity } from './utils';

@Injectable()
export class CompanyContactActions implements IDetailDataActions<Contact>, INestedEditDataActions<Contact, Company> {
  static ADD_COMPANY_CONTACT_REQUEST: string = 'ADD_COMPANY_CONTACT_REQUEST';
  static ADD_COMPANY_CONTACT_SUCCESS: string = 'ADD_COMPANY_CONTACT_SUCCESS';
  static UPDATE_COMPANY_CONTACT_REQUEST: string = 'UPDATE_COMPANY_CONTACT_REQUEST';
  static UPDATE_COMPANY_CONTACT_SUCCESS: string = 'UPDATE_COMPANY_CONTACT_SUCCESS';
  static UPDATE_COMPANY_CONTACT_FAILURE: string = 'UPDATE_COMPANY_CONTACT_FAILURE';
  static SELECT_COMPANY_CONTACT: string = 'SELECT_COMPANY_CONTACT';
  static REMOVE_COMPANY_CONTACT_SUCCESS: string = 'REMOVE_COMPANY_CONTACT_SUCCESS';

  constructor(
    private contactService: ContactService,
    private companyActions: CompanyActions,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) { }

  addAssociation(contact: Contact, company: Company): void {
    this.ngRedux.dispatch({ type: CompanyContactActions.ADD_COMPANY_CONTACT_REQUEST });
    this.contactService.create(company, contact).subscribe(newId => {
      const prevId = contact.id;
      const normalizedData = normalize(createPeristEnity(contact, newId), contactSchema);
      this.ngRedux.dispatch({ type: CompanyContactActions.ADD_COMPANY_CONTACT_SUCCESS, data: normalizedData, prevId, companyId: company.id});
      this.notificatonService.sendNotification('Contact created.', `${contact.firstName} was created.`);
    });
  }

  updateAssociation(contact: Contact, company: Company): void {
    this.ngRedux.dispatch({ type: CompanyContactActions.UPDATE_COMPANY_CONTACT_REQUEST, contact });

    setTimeout(() => {
      this.contactService.update(contact);
      const normalizedData = normalize(contact, contactSchema);
      this.ngRedux.dispatch({ type: CompanyContactActions.UPDATE_COMPANY_CONTACT_SUCCESS, data: normalizedData });
      this.notificatonService.sendNotification('Contact updated.', `${contact.id} was updated.`);
    }, 3000);
  }

  removeAssociation(contact: Contact, company: Company): void {
    this.contactService.remove(company, contact).subscribe(_ => {
      const normalizedData = normalize(contact, contactSchema);
      this.ngRedux.dispatch({ type: CompanyContactActions.REMOVE_COMPANY_CONTACT_SUCCESS, data: normalizedData, companyId: company.id });
    });
  }

  select(contactId: string): void {
    this.contactService.getDetails(contactId).subscribe(contact => {
      const normalizedData = normalize(contact, contactSchema);
      this.ngRedux.dispatch({ type: CompanyContactActions.SELECT_COMPANY_CONTACT, data: normalizedData  });
    }, (error) => {});
  }

  createNew(): void {
    const normalizedData = normalize(Contact.create(), contactSchema);
    this.ngRedux.dispatch({ type: CompanyContactActions.SELECT_COMPANY_CONTACT, data: normalizedData  });
  }
}
