import { Component, ElementRef } from '@angular/core';
import { CommodityComponent, CommodityField } from './commodity.component';
import { FormBuilder } from '@angular/forms';
@Component(Object.assign({
  selector: 'dropoff-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss']
}, CommodityComponent.metaData))
export class DropoffpCommodityComponent extends CommodityComponent {
    protected getFields(): Array<CommodityField> {
      const fields: Array<CommodityField> = super.getFields();
      const pickupNumber = fields.find(f => f.name === 'dropoffNumber');
      pickupNumber.hidden = false;
      return fields;
    }

    constructor(formBuilder: FormBuilder, elementRef: ElementRef) {
      super(formBuilder, elementRef);
    }
}
