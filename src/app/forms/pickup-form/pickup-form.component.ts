import { DatePipe } from '@angular/common';
import { Component, OnChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Commodity } from '../../models';
import { BaseStopForm } from '../base-stop-form';
import { CommodityActions } from '../../actions';

@Component(Object.assign({
  selector: 'pickup-form',
  styleUrls: ['pickup-form.component.scss'],
  templateUrl: './pickup-form.component.html'
}, BaseStopForm.metaData))
export class PickupFormComponent extends BaseStopForm implements OnChanges {
  private pickupCommodities$ = this.commodities$.map(list => list.filter(c => c.pickupId === this.stop.id));

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
