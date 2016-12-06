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
    this.addressForm.addControl(
      'secondStreetAddress',
      this.formBuilder.control(this.address.secondStreetAddress, [Validators.required])
    );
    this.addressForm.addControl(
      'city',
      this.formBuilder.control(this.address.city, [Validators.required])
    );
    this.addressForm.addControl(
      'phone',
      this.formBuilder.control(this.address.phone)
    );
    this.addressForm.addControl(
      'fax',
      this.formBuilder.control(this.address.fax)
    );
    this.addressForm.addControl(
      'state',
      this.formBuilder.control(this.address.state)
    );
    this.addressForm.addControl(
      'zip',
      this.formBuilder.control(this.address.zip)
    );
    this.addressForm.addControl(
      'phoneExtension',
      this.formBuilder.control(this.address.phoneExtension)
    );
    this.addressForm.addControl(
      'faxExtension',
      this.formBuilder.control(this.address.faxExtension)
    );
  }
}
