import { Component, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Contact } from '../../models';
import { Location } from '../../models';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class ContactsForm extends BaseListForm<Contact>  {
  @Input() disabled: boolean = false;
  @Input()
  public locations: Array<Location>;

  constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  createItem(): Contact {
    return Contact.create();
  }

  label(index) {
    return `Contact #${index + 1}`;
  }
}
