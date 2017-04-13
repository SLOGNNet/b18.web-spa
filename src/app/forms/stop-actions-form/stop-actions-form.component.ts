import { Component, Input, ElementRef } from '@angular/core';
import { BaseListForm } from '../base-list-form';
import { StopAction, StopActionTypes, Commodity, Load, Stop } from '../../models';
import { FormBuilder } from '@angular/forms';

@Component(Object.assign({
  selector: 'stop-actions-form',
  templateUrl: './stop-actions-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseListForm.metaData))
export class StopActionsFormComponent extends BaseListForm<StopAction>  {
  @Input() public load: Load;
  @Input() type: StopActionTypes = StopActionTypes.PICKUP;
  @Input() availableCommodities: Array<Commodity> = new Array<Commodity>();
  private stopActionTypes = StopActionTypes;

  constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  createItem(): StopAction {
    return StopAction.create(this.type);
  }

  label(index) {
    return `Action #${index + 1}`;
  }

  trackBy(index: number, stopAction: StopAction) {
    return stopAction.id;
  }
}
