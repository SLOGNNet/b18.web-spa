import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Contact } from '../../models';
import { Address } from '../../models';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss']
}, BaseListForm.metaData))
export class ContactsForm extends BaseListForm<Contact>  {

  @Input()
  public addresses: Array<any>;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  createItem(): Contact {
    return Contact.create();
  }

  label(index) {
    return `Contact #${index + 1}`;
  }
}
