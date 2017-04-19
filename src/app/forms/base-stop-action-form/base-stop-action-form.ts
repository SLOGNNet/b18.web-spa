import { Component, Input, Output, OnChanges, ElementRef, EventEmitter } from '@angular/core';
import { BaseForm } from '../base-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Load, StopAction, Commodity, StopActionTypes } from '../../models';
import { select } from '@angular-redux/store';
import { CommodityActions } from '../../actions';
import { Observable } from 'rxjs/Observable';
import { EnumHelperService } from '../../shared/helpers';

@Component(Object.assign({
  inputs: ['viewMode', 'isNestedForm', 'group', 'load', 'stopAction'],
}, BaseForm.metaData))
export abstract class BaseStopActionForm extends BaseForm implements OnChanges{
  public static metaData: Object = BaseForm.metaData;
  @Input('group') formGroup: FormGroup;
  @Input() public load: Load;
  @Input() public stopAction: StopAction;
  @Output() update = new EventEmitter();
  protected stopActionTypes: Array<string>;
  constructor(elementRef: ElementRef, protected formBuilder: FormBuilder,
    protected commodityActions: CommodityActions, protected datePipe: DatePipe, protected enumHelperService: EnumHelperService) {
    super(elementRef);
        this.stopActionTypes = enumHelperService.getDropdownKeyValues(StopActionTypes);
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
    this.commodityActions.add(newCommodity, this.stopAction, this.load);
  }

  private initForm() {
    this.formGroup.setControl(
      'id',
      this.formBuilder.control(this.stopAction['id'])
    );
    this.formGroup.setControl(
      'type',
      this.formBuilder.control(this.stopAction['type'])
    );
    this.formGroup.setControl(
      'date',
      this.formBuilder.control(this.stopAction['date'])
    );
    this.formGroup.setControl(
      'commodities',
      this.formBuilder.array([])
    );
    this.formGroup.setControl(
      'notes',
      this.formBuilder.control(this.stopAction['notes'])
    );
     this.formGroup.valueChanges.subscribe(value => {
      if (this.formGroup) {
        this.update.emit(Object.assign(this.stopAction, value));
      }
    });
  }
}
