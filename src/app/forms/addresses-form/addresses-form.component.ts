import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { BaseForm } from '../base-form';
import { Address } from '../../models';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'addresses-form',
  templateUrl: './addresses-form.component.html',
  inputs: BaseForm.genericInputs
})
export class AddressesForm extends BaseForm  {
  @Input()
  public addresses: Array<Address>;
  @Input('group')
  public addressesFormArray: FormArray;
  private _addressFormData: Array<any> = new Array<any>();

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnChanges(changes: any) {
    if (changes.addresses) {
      this.initForm();
    }
  }

  initForm() {
    debugger;
    this.clearData();
    for (let address of this.addresses) {
      this.addAddressData(address);
    }
  }

  addAddressData(address: Address): void {
    const group = this.formBuilder.group({});
    this._addressFormData.push({ group, address });
    this.addressesFormArray.push(group);
  }
  clearData() {
    this._addressFormData = new Array<any>();
    this.addressesFormArray.reset([]);
  }
  onAddNew() {
    this.addAddressData(Address.create());
  }

  onRemoveAddress(removeData) {
    this._addressFormData = this._addressFormData.filter(data => data !== removeData);
  }
}
