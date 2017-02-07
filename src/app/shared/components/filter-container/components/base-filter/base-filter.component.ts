import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FilterContainer } from '../../filter-container.component';
import { includes, without, some } from 'lodash';
export class BaseFilter {

  public static filterMetaData = {
    inputs: ['defaultLabel', 'valueField', 'selectedItems'],
    host: {'class': 'filter'},
    changeDetection: ChangeDetectionStrategy.OnPush
  };

  @Input() defaultLabel: string;
  @Input() valueField: string;
  @Input() set selectedItems(items: any) {
    this._selectedItems = items || [];
  }

  @HostBinding('class.active')
  @Input()
  public set active(newValue: boolean) {
    const oldValue = this._active;
    this._active = newValue;
    if (oldValue !== newValue) {
      this.onActiveChanged(newValue);
    }
  }
  public get active() {
    return this._active;
  }
  private _active: boolean = false;
  private _selectedItems: Array<Object> = [];

  get selectedItems() {
    return this._selectedItems;
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

  protected clearSelection() {
    this.selectedItems = [];
  }

  protected isSelected(checkItem: Object) {
    return includes(this.selectedItems, checkItem);
  }

  protected onSelect(changed: Object) {
    if (!this.isSelected(changed)) {
      this.selectedItems.push(changed);
    } else {
      this.selectedItems = without(this.selectedItems, changed);
    }
  }

  protected onActiveChanged(active: boolean) {

  }

  public get count() {
    return this.selectedItems.length;
  }

}
