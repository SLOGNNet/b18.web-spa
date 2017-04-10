import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Company, companySchema, companyListSchema } from '../models';
import { CompanyService, NotificationService } from '../shared';
import { IListDataActions, IDetailDataActions, IRootEditDataActions } from './intefaces';
import { normalize } from 'normalizr';
import { createPeristEnity } from './utils';

@Injectable()
export class CompanyActions implements IListDataActions<Company>, IDetailDataActions<Company>, IRootEditDataActions<Company> {
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
    this.ngRedux.dispatch({ type: CompanyActions.ADD_COMPANY_REQUEST });
      this.companyService.create(company).subscribe(newId => {
        const prevId = company.id;
        const normalizedCompany = normalize(createPeristEnity(company, newId), companySchema);
        this.ngRedux.dispatch({ type: CompanyActions.ADD_COMPANY_SUCCESS, data: normalizedCompany, prevId });
        this.notificatonService.sendNotification('Company created.', `${company.name} was created.`);
      });
  }

  remove(company: Company): void {
    this.ngRedux.dispatch({ type: CompanyActions.REMOVE_COMPANY, company });
  }

  update(company: Company): void {
    const normalizedCompany = normalize(company, companySchema);
    this.ngRedux.dispatch({ type: CompanyActions.UPDATE_COMPANY_REQUEST });

    setTimeout(() => {
      this.companyService.update(company);
      this.ngRedux.dispatch({ type: CompanyActions.UPDATE_COMPANY_SUCCESS, data: normalizedCompany });
      this.notificatonService.sendNotification('Company updated.', `${company.name} was updated.`);
    }, 3000);
  }

  select(companyId: string): void {
    this.companyService.getDetails(companyId).subscribe(company => {
      const normalizedData = normalize(company, companySchema);
      this.ngRedux.dispatch({ type: CompanyActions.SELECT_COMPANY, data: normalizedData });
    }, (error) => {});
  }

  createNew(): void {
    const normalizedCompany = normalize(Company.create(), companySchema);
    this.ngRedux.dispatch({ type: CompanyActions.SELECT_COMPANY, data: normalizedCompany });
  }

  getAll(): void {
    this.companyService.getAll().subscribe(companies => {
      const normalizedData = normalize(companies, companyListSchema);
      this.ngRedux.dispatch({ type: CompanyActions.GET_ALL_COMPANIES, data: normalizedData });
    });
  }
}
