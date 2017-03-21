import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Contact } from '../../models';
import { Location, Mileage } from '../../models';
import { BdFormGroup, BdFormBuilder } from '../../shared';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'mileage-form',
  templateUrl: './mileage-form.component.html',
  styleUrls: ['./mileage-form.component.scss']
}, BaseForm.metaData))
export class MileageForm extends BaseForm {
  @Input() isLast: boolean = false;
  @Input() disabled: boolean = false;
  @Input()
  public mileage: Mileage;
  @Input('group')
  public mileageForm: BdFormGroup;
  @Output() addItem = new EventEmitter<any>();
  @Output() private removeItem = new EventEmitter<any>();


  private fields = [
    { name: 'value', validators: [] },
    { name: 'date', validators: [] },
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
      this.mileageForm.addControl(
        field.name,
        this._formBuilder.control({value: this.mileage[field.name], disabled: this.disabled}, field.validators)
      );
    });
  }

  addNewMileage() {
    this.addItem.emit();
  }

  removeMileage() {
    this.removeItem.emit();
  }
}
