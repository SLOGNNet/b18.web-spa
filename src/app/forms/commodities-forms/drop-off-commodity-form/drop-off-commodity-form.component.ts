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

  get pickupCommodities() {
      //  formGroup.parent().parent().controls()
    return [];//this.formArray.parent.parent.controls['pickups'].value[0].commodities;
  }

  onItemClick(data) {
    const test = data.item;
     this.commodityFormElement.addCommodity(data.item);
  }
}
