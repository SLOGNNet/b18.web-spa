import { Component, Input, Output, EventEmitter, OnChanges, ElementRef } from '@angular/core';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CommodityStore } from '../../stores';
import { DatePipe } from '@angular/common';
import { Stop, StopTypes, Commodity } from '../../models';

@Component(Object.assign({
  inputs: ['viewMode', 'isNestedForm', 'group', 'stop'],
}, BaseForm.metaData))
export abstract class BaseStopForm extends BaseForm implements OnChanges{
  public static metaData: Object = BaseForm.metaData;
  @Input('group') formGroup: FormGroup;
  @Input()
  public stop: Stop;
  private  stopTypes = StopTypes;


  constructor(elementRef: ElementRef, protected formBuilder: FormBuilder,
    protected commodityStore: CommodityStore, protected datePipe: DatePipe) {
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  onCommodityUpdate(commodity: Commodity) {
    this.commodityStore.update(commodity);
  }

  abstract onCommodityRemove(commodity: Commodity);

  onCommodityAdd() {
    const newCommodity = Commodity.create(this.stop);
    this.commodityStore.add(newCommodity);
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
