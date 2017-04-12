import { DatePipe } from '@angular/common';
import { Component, OnChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Commodity } from '../../models';
import { BaseForm } from '../base-form';
import { BaseStopActionForm } from '../base-stop-action-form';
import { CommodityActions } from '../../actions';
import { Observable } from 'rxjs/Observable';

@Component(Object.assign({
  selector: 'stop-action-dropoff-form',
  styleUrls: ['./stop-action-dropoff-form.component.scss'],
  templateUrl: './stop-action-dropoff-form.component.html'
}, BaseForm.metaData))
export class StopActonDropoffFormComponent extends BaseStopActionForm implements OnChanges {
  private availableCommodities$ = Observable.of([]);
  constructor(formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, elementRef: ElementRef, commodityActions: CommodityActions, datePipe: DatePipe) {
    super(elementRef, formBuilder, commodityActions, datePipe);
  }

  ngOnChanges(changes: any) {
    super.ngOnChanges(changes);
  }

  onCommodityRemove(commodity: Commodity) {
    this.commodityActions.deselect(commodity);
  }

  onCommoditySelect(commodity: Commodity) {
    this.commodityActions.select(commodity, this.stopAction);
  }
}
