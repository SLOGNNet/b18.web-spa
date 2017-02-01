import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BaseFilter } from './components';

@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainer {

  @Input() filters: Array<BaseFilter> = [];


  public addFilter(filter: BaseFilter) {
    this.filters.push(filter);
  }

  private _showFilter(filter: BaseFilter) {
    filter.active = true;
  }
}
