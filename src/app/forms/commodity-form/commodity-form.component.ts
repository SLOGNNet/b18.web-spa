import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommodityService } from '../../shared';
import { Commodity } from '../../models';

@Component({
  selector: 'commodity-form',
  templateUrl: './commodity-form.component.html',
  styleUrls: ['./commodity-form.component.scss']
})
export class CommodityFormComponent implements OnInit {

  private _focusedCol = null;
  @Input('group') formControl: FormGroup;
  @Input('commodities') _commodities: Array<Commodity>;

  private _titles = [
    { name: 'PICKUP<br />#'},
    { name: 'P.O.'},
    { name: 'COMMO-<br />DITY'},
    { name: 'UNIT<br />TYPE'},
    { name: 'UNIT<br />COUNT'},
    { name: 'PALLET<br />COUNT'},
    { name: 'WEIGHT<br />(IBS)'}
  ];
  private _fields = [
    { name: 'pickupNumber', type: 'text', validators: [] },
    { name: 'po', type: 'text', validators: [] },
    { name: 'commodity', type: 'text', validators: [] },
    { name: 'unitType', type: 'text', validators: [] },
    { name: 'unitCount', type: 'text', validators: [] },
    { name: 'palletCount', type: 'text', validators: [] },
    { name: 'weight', type: 'text', validators: [] }
  ];

  constructor(
    private _commodityService: CommodityService,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChange() {
    this.initForm();
  }

  initForm() {    
    this.initCommodities(this._commodities);

    if (this.commoditiesformControl.length === 0) {
      this.commoditiesformControl.push(this.initCommodity(new Commodity()));
    }
  }

  initCommodities(commodities: Array<Commodity>) {
    commodities.forEach(item =>
      this.commoditiesformControl.push(this.initCommodity(item))
    );
  }

  initCommodity(commodity: Commodity): FormGroup {
    let controls = {};

    this._fields.forEach(field => {
      controls[field.name] = [commodity[field.name], field.validators]
    });

    return this._formBuilder.group(controls);
  }

  onBlur(col) {
    this._focusedCol = null;
  }

  onFocus(col) {
    this._focusedCol = col;
  }

  onAdd() {
    this.commoditiesformControl.push(this.initCommodity(new Commodity()));
  }

  onRemove(i: number) {
    this._focusedCol = null;
    this.commoditiesformControl.removeAt(i);

    if (this.commoditiesformControl.length === 0) {
      this.commoditiesformControl.push(this.initCommodity(new Commodity()));
    }
  }

  get commoditiesformControl() {
    return <FormArray>this.formControl.controls['commodities'];
  }
}