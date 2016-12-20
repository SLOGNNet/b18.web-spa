import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Commodity } from '../../../models';
import { BaseForm } from '../../base-form';


@Component({
  selector: 'base-commodity-form',
  templateUrl: './base-commodity-form.component.html',
  styleUrls: ['./base-commodity-form.component.scss'],
  inputs: BaseForm.genericInputs
})
export class BaseCommodityFormComponent extends BaseForm {

  @Input('group') formGroup: FormGroup;
  @Input('commodities') commodities: Array<Commodity>;

  private _focusedCol = null;
  private _titles = [
    { name: 'PICKUP<br />#' },
    { name: 'P.O.' },
    { name: 'COMMO-<br />DITY' },
    { name: 'UNIT<br />TYPE' },
    { name: 'UNIT<br />COUNT' },
    { name: 'PALLET<br />COUNT' },
    { name: 'WEIGHT<br />(IBS)' }
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


  constructor(private _formBuilder: FormBuilder, private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    this.initForm();
  }

  public add(commodity: Commodity) {
    this.commoditiesFormControl.push(this.initCommodity(commodity));
  }

  private initForm() {
    this.formGroup.addControl(
      'commodities', this._formBuilder.array(
        this.initCommodities(this.commodities),
      )
    );
  }

  private initCommodities(commodities: Array<Commodity>): Array<FormGroup> {
    let groups = [];
    commodities.forEach(item =>
      groups.push(this.initCommodity(item))
    );

    return groups;
  }

  private initCommodity(commodity: Commodity): FormGroup {
    let controls = {};

    this._fields.forEach(field => {
      controls[field.name] = [commodity[field.name], field.validators];
    });

    return this._formBuilder.group(controls);
  }

  private onBlur(col) {
    this._focusedCol = null;
  }

  private onFocus(col) {
    this._focusedCol = col;
  }

  private onRemove(i: number) {
    this._focusedCol = null;
    this.commoditiesFormControl.removeAt(i);
    this._cdr.detectChanges();
  }

  private get commoditiesFormControl() {
    return <FormArray>this.formGroup.controls['commodities'];
  }

}
