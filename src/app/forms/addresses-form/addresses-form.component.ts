import { Component, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Address } from '../../models';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'addresses-form',
  templateUrl: './addresses-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class AddressesForm extends BaseListForm<Address>  {

  constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  createItem(): Address {
    return Address.create();
  }

  label(index) {
    return `Address #${index + 1}`;
  }

  trackBy(index: number, address: Address) {
    return address.id;
  }
}
