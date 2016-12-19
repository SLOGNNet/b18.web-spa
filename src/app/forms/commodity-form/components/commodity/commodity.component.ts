import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss']
})
export class CommodityComponent {

  @Input('group')
  public commodityForm: FormGroup;
  @Input() isRemoveButtonHidden = false;
  @Input() fields;

  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() remove = new EventEmitter();

  private _isActive = false;
  private _isBlurPrevented = false;
  

  onBlur(e) {
    if (!this._isBlurPrevented) {
      this._isActive = false;
      this.blur.emit(parseInt(e.target.attributes.index.nodeValue));
    }
  }

  onFocus(e) {
    this._isActive = true;
    this.focus.emit(parseInt(e.target.attributes.index.nodeValue));
  }

  onRemove() {
    this.remove.emit();
  }

  over() {
    this._isBlurPrevented = true;
  }

  leave() {
    this._isBlurPrevented = false;
  }
}