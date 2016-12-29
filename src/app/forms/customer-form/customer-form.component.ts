import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Customer, CustomerStatuses, CustomerTypes, Address } from '../../models';
import { AddressStore } from '../../stores';
import { EnumHelperService, BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  providers: [FormValidationService, AddressStore]
}, BaseForm.metaData))
export class CustomerForm extends BaseForm {
  @Input() public scrollable: boolean = false;
  @Input() public submitButtonText: string = 'Save';
  @Input() public customer: Customer;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  customerForm: FormGroup;
  customerTypes: Array<any>;
  selectedCustomerType: string;
  customerStatuses: Array<any>;
  selectedCustomerStatus: string;

  constructor(private formBuilder: FormBuilder,
    private addressStore: AddressStore,
    private enumHelperService: EnumHelperService,
    private cdr: ChangeDetectorRef,
    private validationService: FormValidationService) {
    super();
    this.customerTypes = enumHelperService.getDropdownKeyValues(CustomerTypes);
    this.customerStatuses = enumHelperService.getDropdownKeyValues(CustomerStatuses);
  }

  ngOnChanges(changes: any) {
    this.addressStore.set(this.customer.addresses);
    this.addressStore.addresses.subscribe(adr => {
      this.customer.addresses = adr;
      this.cdr.markForCheck();
    });
    this.initForm();
  }

  submit(customer: Customer, isValid: boolean) {
    if (!isValid) {
      this.validationService.show();
    }

    if (customer && isValid) {
      this.save.emit(customer);
    }
  }

  onCancel() {
    this.customerForm.reset();
    this.cancel.emit();
  }

  initForm() {
    this.customerForm = this.formBuilder.group({
      id: [this.customer.id],
      name: [this.customer.name],
      type: [this.customer.type],
      status: [this.customer.status, Validators.required],
      mc: [this.customer.mc, Validators.required],
      taxId: [this.customer.taxId],
      contacts: this.formBuilder.array([]),
      addresses: this.formBuilder.array([]),
      email: [this.customer.email]
    });
  }

  onAddressAdd(address: Address) {
    this.addressStore.add(address);
  }

  onAddressChange(address: Address) {
    this.addressStore.update(address);
  }

  onAddressRemove(address: Address) {
    this.addressStore.remove(address);
  }

  private onExpandChanged(viewMode) {
    this.viewMode = viewMode;
  }
}
