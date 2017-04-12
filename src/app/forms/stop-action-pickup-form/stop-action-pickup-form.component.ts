import { DatePipe } from '@angular/common';
import { Component, OnChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Commodity } from '../../models';
import { BaseStopActionForm } from '../base-stop-action-form';
import { CommodityActions } from '../../actions';

@Component(Object.assign({
  selector: 'stop-action-pickup-form',
  styleUrls: ['./stop-action-pickup-form.component.scss'],
  templateUrl: './stop-action-pickup-form.component.html'
}, BaseStopActionForm.metaData))
export class StopActionPickupFormComponent extends BaseStopActionForm implements OnChanges {

  constructor(formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, elementRef: ElementRef, commodityActions: CommodityActions, datePipe: DatePipe) {
    super(elementRef, formBuilder, commodityActions, datePipe);
  }

  ngOnChanges(changes: any) {
    super.ngOnChanges(changes);
  }

  onCommodityRemove(commodity: Commodity) {
    this.commodityActions.remove(commodity);
  }
}
