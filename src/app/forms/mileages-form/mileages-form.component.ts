import { Component, Input, ElementRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Contact } from '../../models';
import { Location, MileageRecord } from '../../models';
import { FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'mileages-form',
  templateUrl: './mileages-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class MileagesForm extends BaseListForm<MileageRecord>  {
  @Input() disabled: boolean = false;
  @Input()
  public mileages: Array<MileageRecord>;

  constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  createItem(): MileageRecord {
    return new MileageRecord();
  }

  trackBy(index: number, info: MileageRecord) {
    return info.id;
  }
}
