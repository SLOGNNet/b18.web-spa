import { Output, Input, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseForm } from '../../../../base-form';
import { Commodity } from '../../../../../models';

export class CommodityField {
  name: string;
  hidden?: boolean;
  type: string;
  validators: Array<any>;
}

export class CommodityComponent extends BaseForm {
  public static metaData: Object = BaseForm.metaData;

  @Input('group')
  public commodityForm: FormGroup = this.formBuilder.group({});
  @Input() isRemoveButtonHidden = false;
  @Input() commodity: Commodity;
  @Input() disabled: boolean = false;
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() update = new EventEmitter();

  private _fields: Array<CommodityField> = new Array<CommodityField>();
  private _isActive = false;

  constructor(private formBuilder: FormBuilder, elementRef: ElementRef) {
    super(elementRef);
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }

  ngOnChanges(changes: any) {
    if (changes.commodity && changes.commodity.currentValue) {
      this.initCommodity(this.commodity);
      this.commodityForm.valueChanges.subscribe(value => {
        if (this.commodityForm) {
          this.update.emit(Object.assign(this.commodity, value));
        }
      });
    }
  }

  protected getFields(): Array<CommodityField> {
    const fields = [
      { name: 'id', hidden: true, type: 'text', validators: [] },
      { name: 'pickupId', hidden: true, type: 'text', validators: [] },
      { name: 'dropoffId', hidden: true, type: 'text', validators: [] },
      { name: 'pickupNumber', hidden: true, type: 'text', validators: [] },
      { name: 'dropoffNumber', hidden: true, type: 'text', validators: [] },
      { name: 'po', type: 'text', validators: [] },
      { name: 'commodity', type: 'text', validators: [] },
      { name: 'unitType', type: 'text', validators: [] },
      { name: 'unitCount', type: 'text', validators: [] },
      { name: 'palletCount', type: 'text', validators: [] },
      { name: 'weight', type: 'text', validators: [] }
    ];
    return fields;
  }

  private initCommodity(commodity: Commodity) {
    this._fields = this.getFields();
    this._fields.forEach(field => {
      this.commodityForm.addControl(
        field.name,
        this.formBuilder.control({ value: this.commodity[field.name], disabled: this.disabled }, field.validators)
      );
    });
  }

  private visibleFields(fields: Array<CommodityField>) {
    return fields.filter(f => !f.hidden);
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
