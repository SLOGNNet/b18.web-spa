import { Component, Input, OnChanges, ElementRef } from '@angular/core';
import { BaseForm } from '../base-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Stop, Commodity } from '../../models';
import { select } from 'ng2-redux';
import { CommodityActions } from '../../actions';
import { Observable } from 'rxjs/Observable';
@Component(Object.assign({
  inputs: ['viewMode', 'isNestedForm', 'group', 'stop'],
}, BaseForm.metaData))
export abstract class BaseStopForm extends BaseForm implements OnChanges{
  public static metaData: Object = BaseForm.metaData;
  @select(state => state.commodities.items) commodities$: Observable<Commodity[]>;
  @Input('group') formGroup: FormGroup;
  @Input()
  public stop: Stop;


  constructor(elementRef: ElementRef, protected formBuilder: FormBuilder,
    protected commodityActions: CommodityActions, protected datePipe: DatePipe) {
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  onCommodityUpdate(commodity: Commodity) {
    this.commodityActions.update(commodity);
  }

  abstract onCommodityRemove(commodity: Commodity);

  onCommodityAdd() {
    const newCommodity = Commodity.create();
    newCommodity.pickupId = this.stop.id;
    this.commodityActions.add(newCommodity);
  }

  private initForm() {
    this.formGroup.addControl(
      'date',
      this.formBuilder.control(this.stop['date'])
    );
    this.formGroup.addControl(
      'commodities',
      this.formBuilder.array([])
    );
    this.formGroup.addControl(
      'notes',
      this.formBuilder.control(this.stop['notes'])
    );
  }
}
