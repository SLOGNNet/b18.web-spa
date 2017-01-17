import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomerService, BdFormBuilder, BdFormGroup, EnumHelperService } from '../../shared';
import { Stop, StopTypes, Commodity } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { CommodityStore } from '../../stores';
import { BaseStopForm } from '../base-stop-form';

@Component(Object.assign({
  selector: 'dropoff-form',
  styleUrls: ['dropoff-form.component.scss'],
  templateUrl: './dropoff-form.component.html'
}, BaseForm.metaData))
export class DropoffFormComponent extends BaseStopForm implements OnChanges {
  private availablePickups: Array<Commodity> = new Array<Commodity>();

  constructor(formBuilder: FormBuilder, commodityStore: CommodityStore,
    private cdr: ChangeDetectorRef, elementRef: ElementRef, datePipe: DatePipe) {
    super(elementRef, formBuilder, commodityStore, datePipe);
  }

  ngOnChanges(changes: any) {
    super.ngOnChanges(changes);
    this.commodityStore.getDropoffCommodities(this.stop.id).subscribe(items => {
      this.stop.commodities = items;
      this.cdr.markForCheck();
    });
    this.commodityStore.getAvailableCommodities().subscribe(items => {
      const test = this.availablePickups;
      this.availablePickups = items;
      this.cdr.markForCheck();
    });
  }

  onCommodityRemove(commodity: Commodity) {
    this.commodityStore.deselect(commodity);
  }

  onCommoditySelect(commodity: Commodity) {
    this.commodityStore.select(commodity, this.stop);
  }
}
