import { Component, Input, forwardRef, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterContainer } from '../../filter-container.component';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../../../services';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component(Object.assign({
  selector: 'autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['../base-filter/base-filter.component.scss', './autocomplete-filter.component.scss'],
  providers: [{ provide: BaseFilter, useExisting: forwardRef(() => AutocompleteFilter) }],
  changeDetection: ChangeDetectionStrategy.OnPush
}, BaseFilter.filterMetaData))
export class AutocompleteFilter extends BaseFilter{
  @Input() itemTemplate: TemplateRef<any>;
  private keyUpEventEmitter: EventEmitter<string> = new EventEmitter();
  private scrolledDownEventEmitter: EventEmitter<{ from: number, to: number }> = new EventEmitter();
  private searchedItems = [];
  private allItemsVisible = [];
  private allItems = [];
  private allItemsLoaded = false;
  private isAllItemsLoading = false;
  private isLoading = false;
  private scrollWindow = false;
  private debounce = true;
  private infiniteScrollDistance = 1.1;
  private pageSize = 5;
  @Input() autocompleteSearchSource: (query: string) => Observable<any[]> = () => Observable.empty();
  @Input() allSource: (query: { from: number, to: number }) => Observable<any[]> = () => Observable.empty();

  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {
    super();
  }

  public ngOnInit() {
    this.setupAutocomplete();
    this.setupAllItems();
    this.onScrolledDown();
  }

  public onActiveChanged() {
    this.updateAllItemsVisible();
  }

  public updateAllItemsVisible() {
    this.allItemsVisible = this.allItems.filter(i => !this.isSelected(i));
    this.cdr.markForCheck();
  }

  public onAutocompleteChange(value: string) {
    if (value.length === 0) {
      this.isLoading = false;
      this.searchedItems = [];
      this.cdr.markForCheck();
    }
    else {
      this.keyUpEventEmitter.emit(value);
    }
  }

  private get isSearchBoxShown() {
    return this.searchedItems.length > 0 || this.isLoading;
  }

  public onScrolledDown() {
    if (this.allItemsLoaded || this.isAllItemsLoading || this.isSearchBoxShown) return;

    this.scrolledDownEventEmitter.emit({ from: this.allItems.length, to: this.allItems.length + this.pageSize });
  }

  private setupAutocomplete() {
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

  private setupAllItems() {
    const $allItemsRequest = this.scrolledDownEventEmitter;

    const $allItemsResponse = $allItemsRequest
      .delay(5000)
      .switchMap(this.allSource);

    $allItemsRequest.subscribe(() => {
      this.isAllItemsLoading = true;
      this.cdr.markForCheck();
    });
    $allItemsResponse.subscribe((items: any[]) => {
      this.isAllItemsLoading = false;

      if (items.length < this.pageSize) {
        this.allItemsLoaded = true;
      }

      if (items.length) {
        this.allItems = this.allItems.concat(items);
        this.updateAllItemsVisible();
      }

      this.cdr.markForCheck();
    });
  }
}
