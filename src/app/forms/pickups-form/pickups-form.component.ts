import { Component, Input, ElementRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { Stop, StopTypes, Commodity } from '../../models';
import { FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'pickups-form',
  templateUrl: './pickups-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class PickupsFormComponent extends BaseListForm<Stop>  {

  @Input() type: StopTypes = StopTypes.NONE;
  @Input() availableCommodities: Array<Commodity> = new Array<Commodity>();

  constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  createItem(): Stop {
    return Stop.create(this.type);
  }

  label(index) {
    return `Pickup #${index + 1}`;
  }

  trackBy(index: number, stop: Stop) {
    return stop.id;
  }
}
