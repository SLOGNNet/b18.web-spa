import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Address } from '../../models';
import { EnumHelperService } from '../../shared';
@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html'
})
export class AddressForm {
  @Input('address')
  public address: Address;
  @Input('group')
  public addressForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.addressForm.addControl(
      'streetAddress',
      this.formBuilder.control(this.address.streetAddress, [Validators.required])
    );
  }
}
