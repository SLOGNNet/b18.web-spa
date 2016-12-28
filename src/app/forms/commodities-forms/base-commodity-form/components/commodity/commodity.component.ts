import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from '../../../../base-form';
import { Commodity } from '../../../../../models';

@Component(Object.assign({
  selector: 'commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss']
}, BaseForm.metaData))
export class CommodityComponent extends BaseForm {

  @Input('group')
  public commodityForm: FormGroup = this.formBuilder.group({});
  @Input() isRemoveButtonHidden = false;
  @Input() commodity: Commodity;
  @Input() disabled: boolean = false;
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() change = new EventEmitter();
  public fields = [
    { name: 'pickupNumber', type: 'text', validators: [] },
    { name: 'po', type: 'text', validators: [] },
    { name: 'commodity', type: 'text', validators: [] },
    { name: 'unitType', type: 'text', validators: [] },
    { name: 'unitCount', type: 'text', validators: [] },
    { name: 'palletCount', type: 'text', validators: [] },
    { name: 'weight', type: 'text', validators: [] }
  ];

  private _isActive = false;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnChanges() {
    this.initCommodity(this.commodity);
    this.commodityForm.valueChanges.subscribe(value => {
      if (this.commodityForm) {
        this.change.emit(Object.assign(this.commodity, value));
      }
    });
  }

  private initCommodity(commodity: Commodity) {
    this.fields.forEach(field => {
      this.commodityForm.addControl(
       field.name,
        this.formBuilder.control({ value: this.commodity[field.name], disabled: this.disabled }, field.validators)
      );
    });
  }

  private onBlur(e) {
    this._isActive = false;
    this.blur.emit(parseInt(e.target.attributes.index.nodeValue, 10));
  }

  private onFocus(e) {
    this._isActive = true;
    this.focus.emit(parseInt(e.target.attributes.index.nodeValue, 10));
  }

  private onRemove() {
    this.remove.emit();
  }
}
