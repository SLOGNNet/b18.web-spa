import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { Address } from '../../models';
import { EnumHelperService, BdFormGroup, BdFormBuilder } from '../../shared';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html'
})
export class AddressForm {
  @Input('address')
  public address: Address;
  @Input('group')
  public addressForm: BdFormGroup;
  constructor(private formBuilder: BdFormBuilder) {
  }

  ngOnInit() {
    this.addressForm.addControl(
      'streetAddress',
      this.formBuilder.control(this.address.streetAddress, [Validators.required])
    );
  }
}
