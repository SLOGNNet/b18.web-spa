import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Company } from './models';
import { Observable } from 'rxjs/Observable';
import MockData from './mock-data';
import { getPaginated } from '../../helpers';
import { generatePersistId } from '../../helpers';
import { cloneDeep } from 'lodash';

@Injectable()
export class CompanyService {

  constructor(private http: Http) {
    this.http = http;
  }

  getAll(): Observable<Company[]> {
    return Observable.of(
      MockData.companies
    );
  }

  getDetails(id: string): Observable<Company> {
    return Observable.of(
      cloneDeep(MockData.companies.find((company) => id === company.id))
    );
  }

  create(company: Company): Observable<string> {
    const persistCompany = cloneDeep(company);
    persistCompany.id = generatePersistId();
    MockData.companies.push(persistCompany);
    return Observable.of(persistCompany.id);
  }

  update(company: Company) {
    const id = company.id;

    MockData.companies.forEach(c => {
      if (id === c.id) {
        c = Object.assign(c, company);
      }
    });
  }

  search(query: string): Observable<Company[]> {
    return Observable.of(this._search(query));
  }

  getPaginatedSearch(query, page: number = 0, count: number = 2) {
    return Observable.of(getPaginated(this._search(query), page, count));
  }

  private _search(query: string) {
    let queryRegex = new RegExp(query, 'ig');
    return MockData.companies.filter((company: Company) => {
        return queryRegex.test(company.name);
    });
  }
}
