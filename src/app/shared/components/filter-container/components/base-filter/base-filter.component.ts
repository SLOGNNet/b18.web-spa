import { Input, Output, HostBinding, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { includes, without } from 'lodash';

export class BaseFilter {

  public static filterMetaData = {
    inputs: ['defaultLabel', 'valueField', 'selectedItems'],
    host: {'class': 'filter'},
    changeDetection: ChangeDetectionStrategy.OnPush
  };

  @Input() defaultLabel: string;
  @Input() valueField: string;
  @Output() selectedChanged: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() set selectedItems(items: any) {
    this._selectedItems = items || [];
  }
  get selectedItems() {
    return this._selectedItems;
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


  public get tagValue() {
    return this.selectedItems.length > 0 ? this._selectedItems.map(item => this.getItemValue(item)).join(', ') : this.defaultLabel;
  }

  public getSelectedItemsValues() {
    this.selectedItems.map(item => this.getItemValue(item));
  }

  protected getItemValue(item: Object) {
    return item[this.valueField];
  }

  protected clearSelectedItems(event) {
    this.selectedItems = [];
    this.selectedChanged.emit(this.selectedItems);
  }

  protected isSelected(selectItem: Object) {
    return includes(this.selectedItems, selectItem);
  }

  protected onSelectedChange(changed: Object) {
    if (!this.isSelected(changed)) {
      this.selectedItems.push(changed);
    } else {
      this.selectedItems = without(this.selectedItems, changed);
    }
    this.selectedChanged.emit(this.selectedItems);
  }

  protected onActiveChanged(active: boolean) {

  }

  public get count() {
    return this.selectedItems.length;
  }

}
