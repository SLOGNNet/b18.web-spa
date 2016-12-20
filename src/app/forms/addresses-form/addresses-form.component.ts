import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Address } from '../../models';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'addresses-form',
  templateUrl: './addresses-form.component.html',
  inputs: BaseListForm.genericInputs
})
export class AddressesForm extends BaseListForm<Address>  {

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  createItem(): Address {
    return Address.create();
  }

  label(index) {
    return `Address #${index + 1}`;
  }
}
