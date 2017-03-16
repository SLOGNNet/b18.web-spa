import { Component, Input, ElementRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { Contact } from '../../models';
import { Location } from '../../models';
import { BdFormGroup, BdFormBuilder } from '../../shared';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseForm.metaData))
export class ContactForm extends BaseForm {
  @Input() disabled: boolean = false;
  @Input()
  public contact: Contact;
  @Input()
  public locations: Array<Location>;
  @Input('group')
  public contactForm: BdFormGroup;

  private fields = [
    { name: 'firstName', validators: [Validators.required] },
    { name: 'lastName', validators: [] },
    { name: 'email', validators: [] },
    { name: 'position', validators: [] },
    { name: 'locationId', validators: [] },
    { name: 'location', validators: [] },
    { name: 'contactInfo', validators: [] },
    { name: 'location', validators: [] }
  ];

  constructor(
    private _formBuilder: BdFormBuilder, elementRef: ElementRef){
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    this.fields.forEach(field => {
      this.contactForm.addControl(
        field.name,
        this._formBuilder.control({value: this.contact[field.name], disabled: this.disabled}, field.validators)
      );
    });
  }
}
