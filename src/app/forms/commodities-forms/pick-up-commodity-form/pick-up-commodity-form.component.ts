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
  @Output() update: EventEmitter<Commodity> = new EventEmitter<Commodity>();
  @Output() add: EventEmitter<Commodity> = new EventEmitter<Commodity>();
  @ViewChild('commodityForm') commodityFormElement: BaseCommodityFormComponent;
  @Output() remove: EventEmitter<Commodity> = new EventEmitter<Commodity>();

  onAdd() {
   this.add.emit();
  }

  onUpdate(commodity: Commodity) {
    this.update.emit(commodity);
  }

  onRemove(commodity: Commodity) {
    this.remove.emit(commodity);
  }
}
