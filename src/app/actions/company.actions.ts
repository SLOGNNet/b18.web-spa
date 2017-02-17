import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Company } from '../models';
import { CompanyService } from '../shared';
import { IListDataActions, IDetailDataActions } from './intefaces';

@Injectable()
export class CompanyActions implements IListDataActions<Company>, IDetailDataActions<Company> {
  static ADD_COMPANY: string = 'ADD_COMPANY';
  static REMOVE_COMPANY: string = 'REMOVE_COMPANY';
  static UPDATE_COMPANY: string = 'UPDATE_COMPANY';
  static SELECT_COMPANY: string = 'SELECT_COMPANY';
  static CREATE_NEW_COMPANY: string = 'CREATE_NEW_COMPANY';
  static GET_ALL_COMPANIES: string = 'GET_ALL_COMPANIES';
  constructor (
    private companyService: CompanyService,
    private ngRedux: NgRedux<IAppState>) {}

  add(company: Company): void {
    this.ngRedux.dispatch({ type: CompanyActions.ADD_COMPANY, company });
  }

  remove(company: Company): void {
    this.ngRedux.dispatch({ type: CompanyActions.REMOVE_COMPANY, company });
  }

  update(company: Company): void {
    this.ngRedux.dispatch({ type: CompanyActions.UPDATE_COMPANY, company });
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
