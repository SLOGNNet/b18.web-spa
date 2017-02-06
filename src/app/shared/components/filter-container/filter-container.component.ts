import { Component, Input, ChangeDetectionStrategy, ContentChildren, QueryList, ChangeDetectorRef, OnChanges } from '@angular/core';
import { BaseFilter, AutocompleteFilter } from './components';
import {  difference } from 'lodash';

@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainer  {

  private selectedItems: Array<string> = [];

  @ContentChildren(BaseFilter) filters: QueryList<BaseFilter>;

  ngAfterContentInit() {
    if (this.filters[0]) {
      this.filters[0].active = true;
    }
  }

  get opened() {
    return this.filters.filter(f => f.active === true).length > 0;
  }

  deactivateFilters() {
    this.filters.forEach(f => {
      f.active = false;
    });
  }

  ngOnChanges(changes) {
    this.getSelectedItem();
  }

  getSelectedItem() {
    this.filters.forEach(f => {
      console.log(f.selectedItems, 'f.selectedItems');
      console.log(this.selectedItems, 'this.selectedItems');
      let newSelectedItems = difference(this.selectedItems, f.selectedItems);
      console.log(newSelectedItems, 'newSelectedItems');
      this.selectedItems = f.selectedItems;
      // f.selectedItems.forEach(a => {
      //   this.selectedItems.push(a.name);
      //   console.log(this.selectedItems, 'this.selectedItem');
      // });
    });
  }

  // ngOnChanges(changes) {
  //   console.log(changes, 'changes');
  //   this.getSelectedItem();
  // }

  private _toggleFilter(filter: BaseFilter) {
    let currentActiveState = filter.active;
    this.getSelectedItem();
    this.deactivateFilters();
    filter.active = !currentActiveState;
  }
}
