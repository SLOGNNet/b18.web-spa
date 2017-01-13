import { Component, OnInit, Input, Output,
   ChangeDetectorRef, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Commodity } from '../../../models';
import { BaseListForm } from '../../base-list-form';

export class BaseCommodityFormComponent extends BaseListForm<Commodity>  {
  static metaData = BaseListForm.metaData;
  protected focusedCol = null;
  protected titles: Array<{name: string}>;
  constructor(formBuilder: FormBuilder, private cdr: ChangeDetectorRef, elementRef: ElementRef) {
    super(formBuilder, elementRef);
  }

  ngOnChanges(changes: any) {
    super.ngOnChanges(changes);
    this.titles = this.createTitles();
  }

  commodityTrackBy(index: number, commodityData: any): any {
    return commodityData.item.id;
  }

  public addCommodity(commodity: Commodity) {
    this.addItem(commodity);
  }

  shouldAddDefault() {
    return false;
  }

  protected createTitles() {
    return [
      { name: 'P.O.' },
      { name: 'COMMO-<br />DITY' },
      { name: 'UNIT<br />TYPE' },
      { name: 'UNIT<br />COUNT' },
      { name: 'PALLET<br />COUNT' },
      { name: 'WEIGHT<br />(IBS)' }
    ];
  }

  protected removeItem(removeData) {
    super.removeItem(removeData);
    this.focusedCol = null;
  }

  protected createItem(): Commodity {
    return new Commodity();
  }

  private onBlur(col) {
    this.focusedCol = null;
  }

  private onFocus(col) {
    this.focusedCol = col;
  }
}
