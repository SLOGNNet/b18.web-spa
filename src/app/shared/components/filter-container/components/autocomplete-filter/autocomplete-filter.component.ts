import { Component, Input, forwardRef, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterContainer } from '../../filter-container.component';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../../../services';

@Component(Object.assign({
  selector: 'autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['../base-filter/base-filter.component.scss', './autocomplete-filter.component.scss'],
  providers: [{provide: BaseFilter, useExisting: forwardRef(() => AutocompleteFilter) }],
  changeDetection: ChangeDetectionStrategy.OnPush
}, BaseFilter.filterMetaData))
export class AutocompleteFilter extends BaseFilter{
  @Input() companyItemTemplate: TemplateRef<any>;
  @Input() statusItemTemplate: TemplateRef<any>;
  private keyUpEventEmitter: EventEmitter<string> = new EventEmitter();
  private searchedItems = [];
  private isLoading = false;
  @Input() autocompleteSearchSource: (query: string) => Observable<any[]> = () => Observable.empty();

  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {
    super();
  }

  public ngOnInit() {
    this.setupAutocomplete();
      console.log(this.companyItemTemplate, this.statusItemTemplate );
  }

  public onAutocompleteChange(value: string) {
    this.keyUpEventEmitter.emit(value);
  }

  public cars: Array<Object> = [
    { model: "volvo", color: "blue" },
    { model: "saab", color: "yellow" },
    { model: "ford", color: "green" },
    { model: "vw", color: "orange" }
  ];

  public status: Array<Object> = [
    { status: "volvo", color: "blue" },
    { status: "saab", color: "yellow" },
    { status: "ford", color: "green" },
    { status: "vw", color: "orange" }
  ];

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
}
