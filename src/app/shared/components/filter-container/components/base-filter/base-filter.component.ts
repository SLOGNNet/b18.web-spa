import { Component, Input, HostBinding } from '@angular/core';
import { FilterContainer } from '../../filter-container.component';
import { pick } from 'lodash';

@Component({
})
export class BaseFilter {
  @Input() defaultLabel: string;
  @Input() valueField: string;
  public filterContainer: FilterContainer;
  @Input() set selectedItems(items: any) {
    this._selectedItems = items;
  }
  get selectedItems() {
    return this._selectedItems;
  }
  protected _active: boolean;
  private _selectedItems: Array<Object>;

  constructor(filterContainer: FilterContainer) {
    this.filterContainer = filterContainer;
    this.filterContainer.addFilter(this);
  }

  public tagValue() {
    return this.selectedItems.length > 0 ? this._selectedItems.map(s => s[this.valueField]).join(', ') : this.defaultLabel;
  }

  public count() {
    return this.selectedItems.length;
  }

  @HostBinding('class.active')
  @Input()
  public get active(): boolean {
    return this._active;
  }

  public set active(active: boolean) {
    this._active = active;
  }
}
