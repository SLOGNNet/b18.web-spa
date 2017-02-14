import { Component, Input, Output, forwardRef,
  EventEmitter, ChangeDetectionStrategy,
  ChangeDetectorRef, TemplateRef, ElementRef } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterContainer } from '../../filter-container.component';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../../../services';
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
  @Input() itemTemplate: TemplateRef<any>;
  @Input() scrolledDown: boolean = false;
  @Output() visibilityChange: EventEmitter<any> = new EventEmitter();
  private keyUpEventEmitter: EventEmitter<string> = new EventEmitter();
  private scrolledDownEventEmitter: EventEmitter<PageQuery> = new EventEmitter();
  private loadedItems = [];
  private selectedItemsCache = [];
  private isAllLoaded = false;
  private isLoading = false;
  private page = 0;
  private countPerPage: number = 20;
  private query = '';
  private _btnClearDisabledState: boolean = false;
  @Input() comparer: Function = (item1, item2) => { return item1['id'] === item2['id']; };
  @Input() autocompleteSearchSource: (query: string, page: number, count: number) => Observable<any[]> = () => Observable.empty();

  constructor(private customerService: CustomerService,
              private cdr: ChangeDetectorRef,
              private elRef: ElementRef) {
    super();
  }

  public ngOnInit() {
    this.setupAutocomplete();
    this.onAutocompleteChange('');
  }

  public ngOnChanges(changes) {
    if (changes.scrolledDown && this.scrolledDown) {
      this.loadNextPage();
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
      this.cdr.markForCheck();
    } else {
      this.visibilityChange.emit(false);
    }
  }

  protected onSelect(changed: Object) {
    if (!this.isSelected(changed)) {
      this.selectedItems.push(changed);
    } else {
      this.selectedItems = without(this.selectedItems, changed);
    }
    this.selectionChanged.emit(this.selectedItems);

    if (this.selectedItems.length > 1) this._btnClearDisabledState = false;
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

  public clearSelectedItems(event) {
    event.stopPropagation();
    this._btnClearDisabledState = true;
    this.clearSelection();
    this.onAutocompleteChange(this.query);
  }

  private get loadedItemsCache() {
    return difference(this.loadedItems, this.selectedItemsCache);
  }

  private setupAutocomplete() {
    const $searchRequest = this.keyUpEventEmitter
      .debounceTime(200)
      .distinctUntilChanged();

    const $request = Observable.combineLatest(
      $searchRequest,
      this.scrolledDownEventEmitter.startWith({query: '', page: 0, count: this.countPerPage}),
      (query: string, pageQuery: PageQuery) =>
      { return { query, count: pageQuery.count, page: pageQuery.query === query ? pageQuery.page : 0}; });
    $searchRequest.subscribe(() => {
      this.loadedItems = [];
    });
    $request.subscribe((pageQuery: PageQuery) => {
      this.isLoading = true;
      this.page = pageQuery.page;
      this.cdr.markForCheck();
    });
    const $response = $request.delay(3000)
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
