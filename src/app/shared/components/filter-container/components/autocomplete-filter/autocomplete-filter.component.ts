import { Component, Input, forwardRef, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterContainer } from '../../filter-container.component';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../../../services';

@Component({
  selector: 'autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['../base-filter/base-filter.component.scss', './autocomplete-filter.component.scss'],
  providers: [{provide: BaseFilter, useExisting: forwardRef(() => AutocompleteFilter) }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteFilter extends BaseFilter{
  @Input() public autocompleteSearchSource: Observable<any>;
  private keyUpEventEmitter: EventEmitter<string> = new EventEmitter();
  private searchedItems = [];
  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {
    super();
    this.setupAutocomplete();
  }

  public onAutocompleteChange(value: string) {
    this.keyUpEventEmitter.emit(value);
  }

  setupAutocomplete() {
    this.keyUpEventEmitter
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap((value) => this.customerService.search(value))
      .subscribe((matches: any[]) => {
         this.searchedItems = matches;
         this.cdr.markForCheck();
      });
   }
}
