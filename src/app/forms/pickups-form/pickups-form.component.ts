import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Stop, StopTypes, Commodity } from '../../models';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'pickups-form',
  templateUrl: './pickups-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class PickupsFormComponent extends BaseListForm<Stop>  {

  @Input() type: StopTypes = StopTypes.None;
  @Input() availableCommodities: Array<Commodity> = new Array<Commodity>();

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  createItem(): Stop {
    return Stop.create(this.type);
  }

  label(index) {
    return `Pickup #${index + 1}`;
  }
}
