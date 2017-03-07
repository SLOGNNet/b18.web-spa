import { Component, Input, Output, EventEmitter, OnChanges, ElementRef } from '@angular/core';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Stop, StopTypes, Commodity } from '../../models';
import { NgRedux, select } from 'ng2-redux';
import { CommodityActions } from '../../actions';
import { Observable } from 'rxjs/Observable';
import {
  ICommodityState
} from '../../store';
@Component(Object.assign({
  inputs: ['viewMode', 'isNestedForm', 'group', 'stop'],
}, BaseForm.metaData))
export abstract class BaseStopForm extends BaseForm implements OnChanges{
  public static metaData: Object = BaseForm.metaData;
  @select(state => state.commodities.items) commodities$: Observable<Commodity[]>;
  @Input('group') formGroup: FormGroup;
  @Input()
  public stop: Stop;
  private  stopTypes = StopTypes;


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
