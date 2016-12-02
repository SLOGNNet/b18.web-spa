import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../shared';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';


@Component({
  selector: 'load-form',
  styleUrls: ['load-form.component.scss'],
  templateUrl: './load-form.component.html'
})
export class BdLoadFormComponent {

  public _customers: any[];
  public loadData: any[];
  public query: string = '';


  public constructor(customerService: CustomerService) {
    this._customers = customerService.getCustomersCollection();
    this.loadData = Observable.create((observer: any) => {
      observer.next(this.query);
    }).mergeMap((token: string) => this.getStatesAsObservable(token));
  }

  public getStatesAsObservable(token: string): Observable<any> {
    let query = new RegExp(token, 'ig');

    return Observable.of(
      this._customers.filter((state: any) => {
        return query.test(state.name);
      })
    );
  }
}
