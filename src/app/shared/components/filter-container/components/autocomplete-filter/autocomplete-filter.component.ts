import { Component, Input } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterContainer } from '../../filter-container.component';

@Component({
  selector: 'autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['../base-filter/base-filter.component.scss', './autocomplete-filter.component.scss'],
})
export class AutocompleteFilter extends BaseFilter{
  public constructor(filterContainer: FilterContainer) {
    super(filterContainer);
  }
}
