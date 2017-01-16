import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomerService, BdFormBuilder, BdFormGroup, EnumHelperService } from '../../shared';
import { Stop, StopTypes, Commodity } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseStopForm } from '../base-stop-form';
import { CommodityStore } from '../../stores';

@Component(Object.assign({
  selector: 'pickup-form',
  styleUrls: ['pickup-form.component.scss'],
  templateUrl: './pickup-form.component.html'
}, BaseStopForm.metaData))
export class PickupFormComponent extends BaseStopForm implements OnChanges {
  constructor(formBuilder: FormBuilder, commodityStore: CommodityStore,
    private cdr: ChangeDetectorRef, elementRef: ElementRef, datePipe: DatePipe) {
    super(elementRef, formBuilder, commodityStore, datePipe);
  }

  ngOnChanges(changes: any) {
    super.ngOnChanges(changes);
    this.commodityStore.getPickupCommodities(this.stop.id).subscribe(items => {
      this.stop.commodities = items;
      this.cdr.markForCheck();
    });
  }

  onCommodityRemove(commodity: Commodity) {
    this.commodityStore.remove(commodity);
  }
}
