import { Component, Input, ElementRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { ContactInfo } from '../../models';
import { FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'contacts-info-form',
  templateUrl: './contacts-info-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class ContactsInfoForm extends BaseListForm<ContactInfo>  {
  @Input() disabled: boolean = false;
  @Input()
  public contactsInfo: Array<any>;

  constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  createItem(): ContactInfo {
    return new ContactInfo();
  }

  label(index) {
    return `Contact #${index + 1}`;
  }

  trackBy(index: number, info: ContactInfo) {
    return info.label + info.type;
  }
}
