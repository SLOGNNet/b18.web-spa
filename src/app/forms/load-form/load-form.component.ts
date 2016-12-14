import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomerService, BdFormBuilder, BdFormGroup, ContactService } from '../../shared';
import { Load, Customer , Contacts} from '../../models';
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
  public constructor(private customerService: CustomerService, private formBuilder: BdFormBuilder, private contactService: ContactService) {

  }

  ngOnChanges(changes: any) {
    if (changes.load) {
      this.initForm();
      this.initCustomerTypeahead(changes.load.currentValue);
    }
  }

  onCustomerRemove() {
    this.load.customer = null;
  }

  onAddCustomer() {
    this.load.customer = Customer.create();
    this.customerViewMode = ViewMode.Edit;
  }

  public initForm() {
    console.log(this.contactService.getContacts());
    this.loadForm = this.formBuilder.group({
      customer: [this.load.customer, Validators.required]
    });
  }

  public onCustomerSelect(customer: Customer) {
    this.load.customer = customer;
    this.customerViewMode = ViewMode.View;
  }

  private initCustomerTypeahead(load) {
    this.customerQuery =  load.customer && load.customer.name;
    this.customerSource = Observable.create((observer: any) => {
      observer.next(this.customerQuery);
    }).mergeMap((token: string) => this.customerService.search(token));
  }
}
