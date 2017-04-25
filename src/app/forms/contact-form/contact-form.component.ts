import { Component, Input, ElementRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { Contact, Location } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseForm } from '../base-form';
import { FormValidationService } from '../../shared';

@Component(Object.assign({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: [
    './contact-form.component.scss',
    '../../../assets/styles/form-control.scss'
  ],
  providers: [FormValidationService]
}, BaseForm.metaData))
export class ContactForm extends BaseForm {
  @Input() disabled: boolean = false;
  @Input()
  public contact: Contact;
  @Input()
  public locations: Array<Location>;
  @Input('group')
  public contactForm: FormGroup = this._formBuilder.group({});

  private fields = [
    { name: 'id', validators: [] },
    { name: 'firstName', validators: [Validators.required] },
    { name: 'lastName', validators: [Validators.required] },
    { name: 'middleName', validators: [] },
    { name: 'email', validators: [] },
    { name: 'position', validators: [] },
    { name: 'locationId', validators: [] },
    { name: 'location', validators: [] },
    { name: 'contactInfo', validators: [] },
    { name: 'location', validators: [] }
  ];

  constructor(
    private _formBuilder: FormBuilder, elementRef: ElementRef, private validationService: FormValidationService) {
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    this.fields.forEach(field => {
      this.contactForm.setControl(
        field.name,
        this._formBuilder.control({ value: this.contact[field.name], disabled: this.disabled }, field.validators)
      );
    });
  }

  validate() {
    if (!this.contactForm.valid) {
      this.validationService.show();
    }
  }
}
