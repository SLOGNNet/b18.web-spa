import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Stop, StopTypes } from '../../models';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'stops-form',
  templateUrl: './stops-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class StopsFormComponent extends BaseListForm<Stop>  {

  @Input() type: StopTypes = StopTypes.None;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  createItem(): Stop {
    return Stop.create(this.type);
  }

  label(index) {
    return `Stop #${index + 1}`;
  }
}
