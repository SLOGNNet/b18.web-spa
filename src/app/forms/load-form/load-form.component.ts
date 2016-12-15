import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomerService, BdFormBuilder, BdFormGroup  } from '../../shared';
import { Load, Customer } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';

@Component({
  selector: 'load-form',
  styleUrls: ['load-form.component.scss'],
  templateUrl: './load-form.component.html'
})
export class BdLoadFormComponent {
  @Input() load: Load;
  private customerSource: any[];
  private customerQuery: string = '';
  private customerViewMode: ViewMode = ViewMode.View;
  private loadForm: BdFormGroup;
  private selectedCustomer: Customer;
  public constructor(private customerService: CustomerService, private formBuilder: BdFormBuilder) {

  }

  ngOnChanges(changes: any) {
    if (changes.load) {
      this.selectedCustomer = this.load.customer;
      this.initForm();
      this.initCustomerTypeahead(this.selectedCustomer);
    }
  }

  onCustomerRemove() {
    this.selectedCustomer = null;
  }

  onAddNewCustomer() {
    this.selectedCustomer = Customer.create();
    this.customerViewMode = ViewMode.Edit;
  }

  onCustomerSave(customer: Customer) {
    this.selectedCustomer = customer;
    this.customerService.create(customer);
    this.customerViewMode = ViewMode.View;
    this.initCustomerTypeahead(customer);
  }

  onCustomerEditCancel() {
    this.selectedCustomer = this.load.customer;
  }

  public initForm() {
    this.loadForm = this.formBuilder.group({
      customer: [this.load.customer, Validators.required]
    });
  }

  public onCustomerSelect(customer: Customer) {
    this.load.customer = customer;
    this.customerViewMode = ViewMode.View;
  }

  private initCustomerTypeahead(customer) {
    this.customerQuery =  customer && customer.name;
    this.customerSource = Observable.create((observer: any) => {
      observer.next(this.customerQuery);
    }).mergeMap((token: string) => this.customerService.search(token));
  }
}
