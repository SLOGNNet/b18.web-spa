import { Component, Input, ElementRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Contact } from '../../models';
import { Mileage } from '../../models';
import { FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'mileages-form',
  templateUrl: './mileages-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class MileagesForm extends BaseListForm<Mileage>  {
  @Input() disabled: boolean = false;
  @Input()
  public mileages: Array<Mileage>;

  constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  createItem(): Mileage {
    return new Mileage();
  }

  trackBy(index: number, info: Mileage) {
    return info.id;
  }
}
