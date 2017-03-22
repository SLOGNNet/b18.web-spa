import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Company, Contact } from '../models';
import { ContactService, CompanyService, NotificationService } from '../shared';
import { IDetailDataActions } from './intefaces';
import { CompanyActions } from './company.actions';

@Injectable()
export class CompanyContactActions implements IDetailDataActions<Contact> {
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

  addChild(company: Company, contact: Contact): void {
    this.ngRedux.dispatch({ type: CompanyContactActions.ADD_COMPANY_CONTACT_REQUEST, contact });

    setTimeout(() => {
      this.contactService.create(company, contact);
      this.ngRedux.dispatch({ type: CompanyContactActions.ADD_COMPANY_CONTACT_SUCCESS, contact });
      this.companyActions.select(company.id);
      this.notificatonService.sendNotification('Company created.', `${contact.firstName} was created.`);
    }, 3000);
  }

  remove(contact: Contact): void {

  }

  update(contact: Contact): void {
    this.ngRedux.dispatch({ type: CompanyContactActions.UPDATE_COMPANY_CONTACT_REQUEST, contact });

    setTimeout(() => {
      this.contactService.update(contact);
      this.ngRedux.dispatch({ type: CompanyContactActions.UPDATE_COMPANY_CONTACT_SUCCESS, contact });
      this.notificatonService.sendNotification('Company updated.', `${contact.id} was updated.`);
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
