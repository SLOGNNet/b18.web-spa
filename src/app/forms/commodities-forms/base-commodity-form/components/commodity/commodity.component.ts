import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from '../../../../base-form';

@Component(Object.assign({
  selector: 'commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss']
}, BaseForm.metaData))
export class CommodityComponent extends BaseForm {

  @Input('group')
  public commodityForm: FormGroup;
  @Input() isRemoveButtonHidden = false;
  @Input() fields;

  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() remove = new EventEmitter();

  private _isActive = false;


  onBlur(e) {
    this._isActive = false;
    this.blur.emit(parseInt(e.target.attributes.index.nodeValue, 10));
  }

  onFocus(e) {
    this._isActive = true;
    this.focus.emit(parseInt(e.target.attributes.index.nodeValue, 10));
  }

  onRemove() {
    this.remove.emit();
  }
}
