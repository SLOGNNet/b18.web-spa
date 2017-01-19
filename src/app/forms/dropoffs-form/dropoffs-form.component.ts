import { Component, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Stop, StopTypes } from '../../models';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'dropoffs-form',
  templateUrl: './dropoffs-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class DropoffsFormComponent extends BaseListForm<Stop>  {

  @Input() type: StopTypes = StopTypes.None;

  constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  createItem(): Stop {
    return Stop.create(this.type);
  }

  label(index) {
    return `Dropoff #${index + 1}`;
  }

  trackBy(index: number, stop: Stop) {
    return stop.id;
  }
}
