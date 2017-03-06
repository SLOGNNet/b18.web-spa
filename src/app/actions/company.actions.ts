import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Company } from '../models';
import { CompanyService, NotificationService } from '../shared';
import { IListDataActions, IDetailDataActions } from './intefaces';

@Injectable()
export class CompanyActions implements IListDataActions<Company>, IDetailDataActions<Company> {
  static ADD_COMPANY_REQUEST: string = 'ADD_COMPANY_REQUEST';
  static ADD_COMPANY_SUCCESS: string = 'ADD_COMPANY_SUCCESS';
  static ADD_COMPANY_FAILURE: string = 'ADD_COMPANY_FAILURE';
  static REMOVE_COMPANY: string = 'REMOVE_COMPANY';
  static UPDATE_COMPANY_REQUEST: string = 'UPDATE_COMPANY_REQUEST';
  static UPDATE_COMPANY_SUCCESS: string = 'UPDATE_COMPANY_SUCCESS';
  static UPDATE_COMPANY_FAILURE: string = 'UPDATE_COMPANY_FAILURE';
  static SELECT_COMPANY: string = 'SELECT_COMPANY';
  static CREATE_NEW_COMPANY: string = 'CREATE_NEW_COMPANY';
  static GET_ALL_COMPANIES: string = 'GET_ALL_COMPANIES';
  constructor (
    private companyService: CompanyService,
    private notificatonService: NotificationService,
    private ngRedux: NgRedux<IAppState>) {}

  add(company: Company): void {
    this.ngRedux.dispatch({ type: CompanyActions.ADD_COMPANY_REQUEST, company });

    setTimeout(() => {
      this.companyService.update(company);
      this.ngRedux.dispatch({ type: CompanyActions.ADD_COMPANY_SUCCESS, company });
      this.notificatonService.sendNotification('Company created.', `${company.name} was created.`);
    }, 3000);
  }

  remove(company: Company): void {
    this.ngRedux.dispatch({ type: CompanyActions.REMOVE_COMPANY, company });
  }

  update(company: Company): void {
    this.ngRedux.dispatch({ type: CompanyActions.UPDATE_COMPANY_REQUEST, company });

    setTimeout(() => {
      this.companyService.update(company);
      this.ngRedux.dispatch({ type: CompanyActions.UPDATE_COMPANY_SUCCESS, company });
      this.notificatonService.sendNotification('Company updated.', `${company.name} was updated.`);
    }, 3000);
  }

  select(companyId: number): void {
    this.companyService.getDetails(companyId).subscribe(company => {
      this.ngRedux.dispatch({ type: CompanyActions.SELECT_COMPANY, company });
    });
  }

  createNew(): void {
    this.ngRedux.dispatch({ type: CompanyActions.SELECT_COMPANY, company: Company.create() });
  }

  getAll(): void {
    this.companyService.getAll().subscribe(companies => {
      this.ngRedux.dispatch({ type: CompanyActions.GET_ALL_COMPANIES, items: companies });
    });
  }
}
