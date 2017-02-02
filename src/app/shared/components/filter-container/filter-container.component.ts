import { Component, Input, ChangeDetectionStrategy, ContentChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { BaseFilter, AutocompleteFilter } from './components';

@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainer {

  @ContentChildren(BaseFilter) filters: QueryList<AutocompleteFilter>;


  private _showFilter(filter: BaseFilter) {
    //todo remove active fromothers
   filter.active = true;
  }
}
