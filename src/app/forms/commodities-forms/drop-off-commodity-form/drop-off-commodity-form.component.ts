import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Commodity } from '../../../models';
import { BaseCommodityFormComponent } from '../base-commodity-form';
import { BaseForm } from '../../base-form';

@Component(Object.assign({
  selector: 'drop-off-commodity-form',
  templateUrl: './drop-off-commodity-form.component.html',
  styleUrls: [
    './drop-off-commodity-form.component.scss'
  ]
}, BaseForm.metaData))
export class DropOffCommodityFormComponent extends BaseForm {
  @Input() formArray: FormArray;
  @Input() commodities: Array<Commodity>;
  @ViewChild('commodityForm') commodityFormElement: BaseCommodityFormComponent;

  private showPickups: boolean = false;
  get pickupCommodities() {
    const loadForm =  <FormGroup>this.formArray.root;
    const pickupCommodity = <FormGroup>(loadForm.controls['pickups']).controls[0];
    const commodities = pickupCommodity && this.showPickups ? pickupCommodity.controls['commodities'].value : [];
    const selected = this.commodityFormElement.renderFormData;
    const result =  commodities.filter((c) => !selected.find(rd => rd.item === c));
    return result;
  }

  onShowPickups() {
    this.showPickups = true;
  }

  pickupSelect(commodity: Commodity) {
      this.showPickups = false;
      this.commodityFormElement.addCommodity(commodity);
  }
}
