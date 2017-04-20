import { DatePipe } from '@angular/common';
import { Component, OnChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Commodity } from '../../models';
import { BaseStopActionForm } from '../base-stop-action-form';
import { CommodityActions } from '../../actions';
import { EnumHelperService } from '../../shared/helpers';

@Component(Object.assign({
  selector: 'stop-action-pickup-form',
  styleUrls: ['./stop-action-pickup-form.component.scss'],
  templateUrl: './stop-action-pickup-form.component.html'
}, BaseStopActionForm.metaData))
export class StopActionPickupFormComponent extends BaseStopActionForm implements OnChanges {

  constructor(formBuilder: FormBuilder,
    cdr: ChangeDetectorRef, elementRef: ElementRef, commodityActions: CommodityActions,
    datePipe: DatePipe, enumHelperService: EnumHelperService) {
    super(elementRef, formBuilder, commodityActions, datePipe, enumHelperService, cdr);
  }

  ngOnChanges(changes: any) {
    super.ngOnChanges(changes);
  }

  onCommodityRemove(commodity: Commodity) {
    this.commodityActions.remove(commodity, this.stopAction, this.load);
  }
}
