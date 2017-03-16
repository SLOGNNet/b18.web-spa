import { DatePipe } from '@angular/common';
import { Component, OnChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Commodity } from '../../models';
import { BaseForm } from '../base-form';
import { BaseStopForm } from '../base-stop-form';
import { CommodityActions } from '../../actions';



@Component(Object.assign({
  selector: 'dropoff-form',
  styleUrls: ['dropoff-form.component.scss'],
  templateUrl: './dropoff-form.component.html'
}, BaseForm.metaData))
export class DropoffFormComponent extends BaseStopForm implements OnChanges {
  private availablePickups: Array<Commodity> = new Array<Commodity>();
  private dropoffCommodities$ = this.commodities$.map(list => list.filter(c => c.dropoffId === this.stop.id));
  private availableCommodities$ = this.commodities$.map(list => list.filter(c => !c.dropoffId));
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
    this.commodityActions.select(commodity, this.stop);
  }
}
