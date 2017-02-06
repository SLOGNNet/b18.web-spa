import { Component, Input, forwardRef, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterContainer } from '../../filter-container.component';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../../../services';
import { InfiniteScroll } from 'angular2-infinite-scroll';

class PageQuery {
  page: number;
  query: string;
  count: number;
}

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
  private scrolledDownEventEmitter: EventEmitter<PageQuery> = new EventEmitter();
  private loadedItems = [];
  private isAllLoaded = false;
  private isLoading = false;
  private scrollWindow = false;
  private debounce = true;
  private infiniteScrollDistance = 1.1;
  private page = 0;
  private countPerPage: number = 5;
  private query = '';
  @Input() autocompleteSearchSource: (query: string, page: number, count: number) => Observable<any[]> = () => Observable.empty();

  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {
    super();
  }

  public ngOnInit() {
    this.setupAutocomplete();
    this.keyUpEventEmitter.emit('');
  }

  public onAutocompleteChange(value: string) {
    this.query = value;
    this.keyUpEventEmitter.emit(value);
  }

  private get isSearchMode() {
    return this.query.length > 0;
  }

  public onScrolledDown() {
    if (this.isAllLoaded || this.isLoading) return;
    this.scrolledDownEventEmitter.emit({ query: this.query, page: this.page++, count: this.countPerPage });
  }

  private get availableItems() {
    return this.loadedItems.filter(item => !this.isSelected(item));
  }
  private setupAutocomplete() {
    const $searchRequest = this.keyUpEventEmitter
      .debounceTime(200)
      .distinctUntilChanged();

    const $request = Observable.combineLatest(
      $searchRequest,
      this.scrolledDownEventEmitter.startWith({query: '', page: 0, count: this.countPerPage}),
      (query: string, pageQuery: PageQuery) => { return { query, count: pageQuery.count, page: pageQuery.query === query ? pageQuery.page : 0}; });
    $searchRequest.subscribe(() => {
      this.loadedItems = [];
    });
    $request.subscribe((pageQuery: PageQuery) => {
      this.isLoading = true;
      this.page = pageQuery.page;
      this.cdr.markForCheck();
    });
    const $response = $request
      .switchMap((pageQuery: PageQuery) => { return this.autocompleteSearchSource(pageQuery.query, pageQuery.page, pageQuery.count); });

    $response.subscribe((matches: any[]) => {
      this.isLoading = false;
      this.isAllLoaded = matches.length !== this.countPerPage;
      this.selectedItems = this.selectedItems.filter(item => matches.find(m => m['id'] === item['id']) || item);
      this.loadedItems = this.loadedItems.concat(matches);
      this.cdr.markForCheck();
    });
  }
}
