import { Component, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';
import { BaseFilter, AutocompleteFilter } from './components';

@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainer {
  @Output() visibilityChange: EventEmitter<any> = new EventEmitter();
  @ContentChildren(BaseFilter) filters: QueryList<BaseFilter>;

  private _hoveredFilter = null;

  constructor(private cdr: ChangeDetectorRef) {

  }

  ngAfterContentInit() {
    if (this.filters) {
      this.filters.forEach((filterItem: BaseFilter) => {
        filterItem.selectedChanged.subscribe(filter => {
          const visibleFilters = this.filters.filter(f => f.active);

          if (visibleFilters.length === 0) {
            this.deactivateFilters();
          }

          this.cdr.markForCheck();
        });
      });
    }
  }

  get opened() {
    return this.filters.filter(f => f.active === true).length > 0;
  }

  onFilterItemHover(filter) {
    this._hoveredFilter = filter;
  }

  deactivateFilters() {
    this.filters.forEach(f => {
      f.active = false;
    });

    this.visibilityChange.emit(false);
  }

  private _toggleFilter(filter: BaseFilter) {
    let currentFilterState = filter.active;
    this.deactivateFilters();
    filter.active = !currentFilterState;
    this.visibilityChange.emit(filter.active);
  }
}
