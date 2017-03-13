import { Component, Input, Output, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Location } from '../../models';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'locations-form',
  templateUrl: './locations-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class LocationsForm extends BaseListForm<Location>  {
  @Input() disabled: boolean = false;

  constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  createItem(): Location {
    return Location.create();
  }

  label(index) {
    return `Location #${index + 1}`;
  }

  trackBy(index: number, location: Location) {
    return location.id;
  }
}
