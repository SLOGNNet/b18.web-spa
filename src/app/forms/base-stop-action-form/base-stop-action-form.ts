import { Component, Input, OnChanges, ElementRef } from '@angular/core';
import { BaseForm } from '../base-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StopAction, Commodity } from '../../models';
import { select } from '@angular-redux/store';
import { CommodityActions } from '../../actions';
import { Observable } from 'rxjs/Observable';
@Component(Object.assign({
  inputs: ['viewMode', 'isNestedForm', 'group', 'stop'],
}, BaseForm.metaData))
export abstract class BaseStopActionForm extends BaseForm implements OnChanges{
  public static metaData: Object = BaseForm.metaData;
  @Input('group') formGroup: FormGroup;
  @Input()
  public stopAction: StopAction;


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
    this.commodityActions.add(newCommodity);
  }

  private initForm() {
    this.formGroup.addControl(
      'date',
      this.formBuilder.control(this.stopAction['date'])
    );
    this.formGroup.addControl(
      'commodities',
      this.formBuilder.array([])
    );
    this.formGroup.addControl(
      'notes',
      this.formBuilder.control(this.stopAction['notes'])
    );
  }
}
