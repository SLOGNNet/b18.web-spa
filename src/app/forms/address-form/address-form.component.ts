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
  public address: Address;

  @Input('group')
  public addressForm: BdFormGroup;

  private fields = [
    { name: 'phone', validators: [] },
    { name: 'fax', validators: [] },
    { name: 'state', validators: [] },
    { name: 'zip', validators: [] },
    { name: 'phoneExtension', validators: [] },
    { name: 'faxExtension', validators: [] },
    { name: 'streetAddress', validators: [Validators.required] },
    { name: 'secondStreetAddress', validators: [Validators.required] },
    { name: 'city', validators: [Validators.required] }
  ];

  constructor(private formBuilder: BdFormBuilder) {
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    this.fields.forEach(field => {
      this.addressForm.addControl(
        field.name,
        this.formBuilder.control(this.address[field.name], field.validators)
      );
    });
  }
}
