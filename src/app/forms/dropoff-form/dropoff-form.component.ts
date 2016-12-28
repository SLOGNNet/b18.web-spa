import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomerService, BdFormBuilder, BdFormGroup, EnumHelperService } from '../../shared';
import { Stop, StopTypes, Commodity } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { CommodityStore } from '../../stores';

@Component(Object.assign({
  selector: 'dropoff-form',
  styleUrls: ['dropoff-form.component.scss'],
  templateUrl: './dropoff-form.component.html'
}, BaseForm.metaData))
export class DropoffFormComponent extends BaseForm implements OnChanges {
  @Input('group') formGroup: FormGroup;
  @Input()
  public stop: Stop;

  private availablePickups: Array<Commodity> = new Array<Commodity>();
  private  stopTypes = StopTypes;

  constructor(private formBuilder: FormBuilder, private commodityStore: CommodityStore, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnChanges(changes: any) {
    this.initForm();
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

  onCommoditySelect(commodity: Commodity) {
    this.commodityStore.select(commodity, this.stop);
  }

  onCommodityChange(commodity: Commodity) {
    this.commodityStore.update(commodity);
  }

  onCommodityRemove(commodity: Commodity) {
    this.commodityStore.deselect(commodity);
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
