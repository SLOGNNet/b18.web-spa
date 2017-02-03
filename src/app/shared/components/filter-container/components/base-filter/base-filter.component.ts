import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FilterContainer } from '../../filter-container.component';
import { includes } from 'lodash';
export class BaseFilter {

  public static filterMetaData = {
    inputs: ['defaultLabel', 'valueField', 'selectedItems'],
    host: {'class': 'filter'},
    changeDetection: ChangeDetectionStrategy.OnPush
  };

  @Input() defaultLabel: string;
  @Input() valueField: string;
  public filterContainer: FilterContainer;
  @Input() set selectedItems(items: any) {
    this._selectedItems = items || [];
  }
  get selectedItems() {
    return this._selectedItems;
  }

  protected _active: boolean = false;
  private _selectedItems: Array<Object> = [];

  constructor() {

  }

  public get tagValue() {
    return this.selectedItems.length > 0 ? this._selectedItems.map(item => this.getItemValue(item)).join(', ') : this.defaultLabel;
  }

  public getSelectedItemsValues() {
    this.selectedItems.map(item => this.getItemValue(item));
  }

  protected getItemValue(item: Object) {
    return item[this.valueField];
  }

  protected isSelected(item: Object) {
    return includes(this.selectedItems, item);
  }

  protected onSelect(item: Object) {
    if (!this.isSelected(item)) {
      this.selectedItems.push(item);
    }
  }

  public get count() {
    return this.selectedItems.length;
  }

  @HostBinding('class.active')
  public get active(): boolean {
    return this._active;
  }

  public set active(active: boolean) {
    this._active = active;
  }
}
