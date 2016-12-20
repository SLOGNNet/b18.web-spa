import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Commodity } from '../../../models';
import { BaseCommodityFormComponent } from '../base-commodity-form';

@Component({
  selector: 'pick-up-commodity-form',
  templateUrl: './pick-up-commodity-form.component.html',
  styleUrls: [
    './pick-up-commodity-form.component.scss'
  ]
})
export class PickUpCommodityFormComponent {
  @Input('group') formGroup: FormGroup;
  @Input() commodities: Array<Commodity>;
  @ViewChild('commodityForm') commodityFormElement: BaseCommodityFormComponent;

  onAdd() {
   this.commodityFormElement.add(new Commodity());
  }
}
