import { Component, Input, OnChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomerService, BdFormBuilder, BdFormGroup, EnumHelperService } from '../../shared';
import { Stop, StopTypes, Commodity } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { CommodityStore } from '../../stores';

@Component(Object.assign({
  selector: 'pickup-form',
  styleUrls: ['pickup-form.component.scss'],
  templateUrl: './pickup-form.component.html'
}, BaseForm.metaData))
export class PickupFormComponent extends BaseForm implements OnChanges {
  @Input('group') formGroup: FormGroup;
  @Input()
  public stop: Stop;

  private  stopTypes = StopTypes;

  constructor(private formBuilder: FormBuilder, private commodityStore: CommodityStore, private cdr: ChangeDetectorRef, elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.commodityStore.getPickupCommodities(this.stop.id).subscribe(items => {
      this.stop.commodities = items;
      this.cdr.markForCheck();
    });
    this.initForm();
  }

  onCommodityUpdate(commodity: Commodity) {
    this.commodityStore.update(commodity);
  }

  onCommodityRemove(commodity: Commodity) {
    this.commodityStore.remove(commodity);
  }

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
