import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Commodity } from '../../../models';
import { BaseCommodityFormComponent } from '../base-commodity-form';
import { BaseForm } from '../../base-form';

@Component(Object.assign({
  selector: 'pick-up-commodity-form',
  templateUrl: './pick-up-commodity-form.component.html',
  styleUrls: [
    './pick-up-commodity-form.component.scss'
  ]
}, BaseForm.metaData))
export class PickUpCommodityFormComponent extends BaseForm {
  @Input() formArray: FormArray;
  @Input() commodities: Array<Commodity>;
  @Output() change: EventEmitter<Commodity> = new EventEmitter<Commodity>();
  @ViewChild('commodityForm') commodityFormElement: BaseCommodityFormComponent;

  onAdd() {
   this.commodityFormElement.addCommodity(new Commodity());
  }

  onChange(commodity: Commodity) {
    this.change.emit(commodity);
  }
}
