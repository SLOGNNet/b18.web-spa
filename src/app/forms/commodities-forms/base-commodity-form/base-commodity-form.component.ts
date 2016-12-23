import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Commodity } from '../../../models';
import { BaseListForm } from '../../base-list-form';

@Component(Object.assign({
  selector: 'base-commodity-form',
  templateUrl: './base-commodity-form.component.html',
  styleUrls: ['./base-commodity-form.component.scss'],
}, BaseListForm.metaData))

export class BaseCommodityFormComponent extends BaseListForm<Commodity>  {

  private focusedCol = null;
  private titles = [
    { name: 'PICKUP<br />#' },
    { name: 'P.O.' },
    { name: 'COMMO-<br />DITY' },
    { name: 'UNIT<br />TYPE' },
    { name: 'UNIT<br />COUNT' },
    { name: 'PALLET<br />COUNT' },
    { name: 'WEIGHT<br />(IBS)' }
  ];

  constructor(formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    super(formBuilder);
  }

  public addCommodity(commodity: Commodity) {
    this.addItem(commodity);
  }
  protected createItem(): Commodity {
    return new Commodity();
  }

  protected removeItem(removeData) {
    super.removeItem(removeData);
    this.focusedCol = null;
    this.cdr.detectChanges();
  }

  private onBlur(col) {
    this.focusedCol = null;
  }

  private onFocus(col) {
    this.focusedCol = col;
  }
}
