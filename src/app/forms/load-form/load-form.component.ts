import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../shared';
import { Load, Customer } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';


@Component({
  selector: 'load-form',
  styleUrls: ['load-form.component.scss'],
  templateUrl: './load-form.component.html'
})
export class BdLoadFormComponent {

  @Input() load: Load;
  private customerSource: any[];
  private customerQuery: string = '';

  public constructor(private customerService: CustomerService) {

  }

  ngOnInit() {
    this.customerQuery = this.load.customer.name;
    this.customerSource = Observable.create((observer: any) => {
      debugger;
      observer.next(this.customerQuery);
    }).mergeMap((token: string) => this.customerService.search(token));
  }

  public onCustomerSelect(customer: Customer) {
    this.load.customer = customer;
  }
}
