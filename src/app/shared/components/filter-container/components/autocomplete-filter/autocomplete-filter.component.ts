import { Component, Input, forwardRef, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterContainer } from '../../filter-container.component';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../../../services';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
  selector: 'autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['../base-filter/base-filter.component.scss', './autocomplete-filter.component.scss'],
  providers: [{provide: BaseFilter, useExisting: forwardRef(() => AutocompleteFilter) }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteFilter extends BaseFilter{
  private keyUpEventEmitter: EventEmitter<string> = new EventEmitter();
  private scrolledDownEventEmitter: EventEmitter<{ from: number, to: number}> = new EventEmitter();
  private searchedItems = [];
  private allItems = [];
  private isLoading = false;
  private scrollWindow = false;
  private debounce = true;
  private infiniteScrollDistance = 1.1;
  @Input() autocompleteSearchSource: (query: string) => Observable<any[]> = () => Observable.empty();
  @Input() allSource: (query: { from: number, to: number}) => Observable<any[]> = () => Observable.empty();

  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {
    super();
  }

  public ngOnInit() {
    this.setupAutocomplete();
    this.setupAllItems();
  }

  public onAutocompleteChange(value: string) {
    this.keyUpEventEmitter.emit(value);
  }

  public onScrolledDown() {
    console.log('adsf');
    this.scrolledDownEventEmitter.emit({ from: this.allItems.length, to: this.allItems.length + 1 });
  }

  setupAutocomplete() {
    const $searchRequest = this.keyUpEventEmitter
      .debounceTime(200)
      .distinctUntilChanged();

    const $searchResponse = $searchRequest
      .delay(1000)
      .switchMap(this.autocompleteSearchSource);

    $searchRequest.subscribe(() => {
      this.isLoading = true;
      this.searchedItems = [];
      this.cdr.markForCheck();
    });
    $searchResponse.subscribe((matches: any[]) => {
       this.isLoading = false;
       this.searchedItems = matches;
       this.cdr.markForCheck();
    });
   }

  setupAllItems() {
    const $allItemsRequest = this.scrolledDownEventEmitter
      .distinctUntilChanged();

    const $allItemsResponse = $allItemsRequest
      .delay(1000)
      .switchMap(this.allSource);

    $allItemsRequest.subscribe(() => {
      this.isLoading = true;
      this.cdr.markForCheck();
    });
    $allItemsResponse.subscribe((items: any[]) => {
       this.isLoading = false;
       this.allItems = this.allItems.concat(items);
       this.cdr.markForCheck();
    });
   }
}
