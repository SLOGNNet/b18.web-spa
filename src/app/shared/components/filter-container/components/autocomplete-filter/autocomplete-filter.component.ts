import { Component, Input, forwardRef } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterContainer } from '../../filter-container.component';

@Component({
  selector: 'autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['../base-filter/base-filter.component.scss', './autocomplete-filter.component.scss'],
  providers: [{provide: BaseFilter, useExisting: forwardRef(() => AutocompleteFilter) }]
})
export class AutocompleteFilter extends BaseFilter{
  constructor() {
    super();
  }
}
