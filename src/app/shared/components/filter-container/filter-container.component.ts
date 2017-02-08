import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';
import { BaseFilter, AutocompleteFilter } from './components';

@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainer {
  @Output() stateChange: EventEmitter<any> = new EventEmitter();
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

    this.stateChange.emit(false);
  }

  private _toggleFilter(filter: BaseFilter) {
    let currentActiveState = filter.active;
    this.deactivateFilters();
    filter.active = !currentActiveState;
    this.stateChange.emit(filter.active);
  }
}
