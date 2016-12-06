import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { Address } from '../../models';
import { EnumHelperService, BdFormGroup, BdFormBuilder } from '../../shared';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressForm {
  @Input('address')
  @Input('group')

  public address: Address;
  public addressForm: BdFormGroup;
  
  constructor(private formBuilder: BdFormBuilder) {
  }

  ngOnInit() {
    this.addFieldsToFormControl();
    this.addRequiredFieldsToFormControl();
  }

  addFieldsToFormControl() {
    const fields = [
      'phone',
      'fax',
      'state',
      'zip',
      'phoneExtension',
      'faxExtension'
    ];

    fields.forEach(fieldName => {
      this.addressForm.addControl(
        fieldName,
        this.formBuilder.control(this.address[fieldName])
      );
    });
  }

  addRequiredFieldsToFormControl() {
    const requiredFields = [
      'streetAddress',
      'secondStreetAddress',
      'city'
    ];

    requiredFields.forEach(fieldName => {
      this.addressForm.addControl(
        fieldName,
        this.formBuilder.control(this.address[fieldName], [Validators.required])
      );
    });
  }
}
