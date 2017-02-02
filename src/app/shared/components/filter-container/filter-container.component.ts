import { Component, Input, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';
import { BaseFilter, AutocompleteFilter } from './components';

@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainer {

@ContentChildren(BaseFilter) filters: QueryList<BaseFilter>;

  ngAfterContentInit() {
    if (this.filters[0]) {
      this.filters[0].active = true;
    }
  }

  private _toggleFilter(filter: BaseFilter) {
    this.deactivateAllFilters();
    filter.active = true;
  }

  deactivateAllFilters() {
    this.filters.forEach(f => f.active = false);
  }
}
