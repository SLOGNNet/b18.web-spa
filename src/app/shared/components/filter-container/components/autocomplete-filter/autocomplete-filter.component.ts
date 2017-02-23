import { Component, Input, forwardRef,
  EventEmitter, ChangeDetectionStrategy,
  ChangeDetectorRef, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterContainer } from '../../filter-container.component';
import { Observable } from 'rxjs/Observable';
import { difference, without } from 'lodash';

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
export class AutocompleteFilter extends BaseFilter {
  @ViewChild('bdInput') bdInput;
  @Input() itemTemplate: TemplateRef<any>;
  @Input()
  public set scrolledDown(newValue: boolean) {
    if (this._scrolledDown !== newValue && newValue) {
      this.loadNextPage();
    }
    this._scrolledDown = newValue;
  }
  public get scrolledDown() {
    return this._scrolledDown;
  }
  @Input() countPerPage: number = 20;
  @Input() debounceTime: number = 200;
  private keyUpEventEmitter: EventEmitter<string> = new EventEmitter();
  private scrolledDownEventEmitter: EventEmitter<PageQuery> = new EventEmitter();
  private loadedItems = [];
  private selectedItemsCache = [];
  private isAllLoaded = false;
  private isLoading = false;
  private startPage = 1;
  private page = this.startPage;
  private query = '';
  private _scrolledDown: boolean = false;
  private isSearchFieldFocused: boolean = false;
  @Input() comparer: Function = (item1, item2) => { return item1['id'] === item2['id']; };
  @Input() autocompleteSearchSource: (query: string, page: number, count: number) => Observable<any[]> = () => Observable.empty();

  constructor(private cdr: ChangeDetectorRef,
    private elRef: ElementRef) {
    super();
  }

  public ngOnInit() {
    this.setupAutocomplete();
    this.onAutocompleteChange('');
  }

  ngAfterViewChecked() {
    if (!this.isSearchFieldFocused) {
      this.isSearchFieldFocused = true;
      this.bdInput.focus(new Event('focus'));
      this.cdr.detectChanges();
    }
  }

  public onAutocompleteChange(value: string) {
    this.query = value;
    this.keyUpEventEmitter.emit(value);
  }

  private get isSearchMode(): boolean {
    return this.query.length > 0;
  }

  protected onActiveChanged(isActive: boolean) {
    if (isActive) {
      this.selectedItemsCache = this.selectedItems.slice();
      this.isSearchFieldFocused = false;
      this.cdr.markForCheck();
    }
  }

  protected onSelectedChange(changed) {
    super.onSelectedChange(changed);
  }

  public onItemClick(item) {
    this.active = false;
    super.onSelectedChange(item);
  }

  public loadNextPage() {
    if (!this.active || this.isAllLoaded || this.isLoading) return;
    this.page = this.page + 1;
    this.scrolledDownEventEmitter.emit({ query: this.query, page: this.page, count: this.countPerPage });
  }

  public clearField(event) {
    this.query = '';
    this.onAutocompleteChange(this.query);
  }

  get isClearButtonDisabled() {
    return !this.selectedItems.length;
  }

  protected clearSelectedItems(event) {
    event.stopPropagation();

    super.clearSelectedItems(event);
    this.onAutocompleteChange(this.query);
  }

  private get loadedItemsCache() {
    return difference(this.loadedItems, this.selectedItemsCache);
  }

  private setupAutocomplete() {
    const $searchRequest = this.keyUpEventEmitter
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();

    const $request = Observable.combineLatest(
      $searchRequest,
      this.scrolledDownEventEmitter.startWith({query: '', page: this.startPage, count: this.countPerPage}),
      (query: string, pageQuery: PageQuery) =>
      { return { query, count: pageQuery.count, page: pageQuery.query === query ? pageQuery.page : this.startPage}; });
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
      this.selectedItems = this.merge(this.selectedItems, matches);
      this.selectedItemsCache = this.merge(this.selectedItemsCache, matches);
      this.loadedItems = this.loadedItems.concat(matches);
      this.cdr.markForCheck();
    });
  }

  private merge(source1: any[], source2: any[]) {
     return source1.filter(item => source2.find(mergeItem => this.comparer(mergeItem, item)) || item);
  }
}
