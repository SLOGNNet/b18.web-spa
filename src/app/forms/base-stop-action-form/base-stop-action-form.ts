import { Component, Input, Output, OnChanges, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BaseForm } from '../base-form';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Load, StopAction, Commodity, StopActionTypes, Stop } from '../../models';
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
  @Input() public stop: Stop;
  @Input() public stopAction: StopAction;
  @Output() update = new EventEmitter();
  protected commoditiesFormArray: FormArray;
  protected stopActionTypes: Array<string>;
  protected get hasCommodities(): boolean {
    return this.stopAction && this.stopAction.commodities &&  this.stopAction.commodities.length > 0;
  }
  constructor(elementRef: ElementRef, protected formBuilder: FormBuilder,
    protected commodityActions: CommodityActions, protected datePipe: DatePipe,
    protected enumHelperService: EnumHelperService, protected cdr: ChangeDetectorRef) {
    super(elementRef);
        this.stopActionTypes = enumHelperService.getDropdownKeyValues(StopActionTypes);
  }

  ngOnChanges(changes: any) {
    if (changes.load || changes.stopAction || changes.formGroup) {
      this.initForm();
    }
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
    this.commoditiesFormArray = this.formBuilder.array([]);
    this.formGroup.setControl(
      'id',
      this.formBuilder.control(this.stopAction['id'])
    );
    this.formGroup.setControl(
      'type',
      new FormControl({value: this.stopAction['type'], disabled: this.hasCommodities})
    );
    this.formGroup.setControl(
      'date',
      this.formBuilder.control(this.stopAction['date'])
    );
    this.formGroup.setControl(
      'notes',
      this.formBuilder.control(this.stopAction['notes'])
    );
    this.formGroup.setControl(
      'commodities',
      this.formBuilder.control(this.stopAction['commodities'])
    );
    this.formGroup.valueChanges.subscribe(value => {
      if (this.formGroup) {
        const result = Object.assign(this.stopAction, value);
        this.update.emit(result);
      }
    });
  }
}
