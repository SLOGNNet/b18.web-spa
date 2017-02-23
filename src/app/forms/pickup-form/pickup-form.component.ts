import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CompanyService, BdFormBuilder, BdFormGroup } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import { Stop, StopTypes, Commodity } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseStopForm } from '../base-stop-form';
import { CommodityActions } from '../../actions';

@Component(Object.assign({
  selector: 'pickup-form',
  styleUrls: ['pickup-form.component.scss'],
  templateUrl: './pickup-form.component.html'
}, BaseStopForm.metaData))
export class PickupFormComponent extends BaseStopForm implements OnChanges {
  private pickupCommodities$ = this.commodities$.map(list => list.filter(c => c.pickupId === this.stop.id));

  constructor(formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, elementRef: ElementRef, commodityActions: CommodityActions, datePipe: DatePipe) {
    super(elementRef, formBuilder, commodityActions, datePipe);
  }

  ngOnChanges(changes: any) {
    super.ngOnChanges(changes);
  }

  onCommodityRemove(commodity: Commodity) {
    this.commodityActions.remove(commodity);
  }
}
