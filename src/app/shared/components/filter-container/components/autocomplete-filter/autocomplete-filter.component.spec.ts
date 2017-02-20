import { AutocompleteFilter } from '../index';
import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Input, Output, EventEmitter, Directive, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { SharedModule } from '../../../../shared.module';
fdescribe('autocomplete-filter', () => {

  let component:    AutocompleteFilter;
  let searchService;
  let fixture: ComponentFixture<AutocompleteFilter>;
  let de:      DebugElement;
  let page: Page;
  const searchData = [{name: 'test'}, {name: 'test1'}, {name: 'test2'}];

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [SharedModule]});
    Observable.prototype.debounceTime = function () { return this; };
    fixture = TestBed.createComponent(AutocompleteFilter);
    component = fixture.componentInstance;
    searchService = {
      searchSource: (query: string, pageNumber: number, count: number) => { console.log('called'); return Observable.of(searchData) }
    };
    debugger;
    spyOn(searchService, 'searchSource').and.callThrough();
//    fixture.detectChanges();
    page = new Page();
//    page.addPageElements();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  fdescribe('ngOnInit', () => {
    const countPerPage = 10
    beforeEach(() => {
      debugger;
      component.autocompleteSearchSource = searchService.searchSource;
      component.countPerPage = countPerPage;
      component.debounceTime = 0;
      fixture.detectChanges();
    });

    it('should start load data with empty query', fakeAsync(() => {
      tick();
      expect(searchService.searchSource.calls.count()).toBe(1);
      expect(searchService.searchSource).toHaveBeenCalledWith('', 0, countPerPage);
    }));


    it('should start load data with query', fakeAsync(() => {
      page.addPageElements();
      const query = 'testquery';
      page.queryInput.value = query;
      fireEvent(page.queryInput, 'keyup');
      fixture.detectChanges();
      tick();
      expect(searchService.searchSource.calls.count()).toBe(2);
      expect(searchService.searchSource).toHaveBeenCalledWith(query, 0, countPerPage);
    }));


    it('should start load next page when event requested', fakeAsync(() => {
      tick();
      component.scrolledDown = true;
      console.log('adawda akwdjladjew awdjawjdklja jawdlawjdlkjawl')
      fixture.detectChanges();
      tick();
      expect(searchService.searchSource.calls.count()).toBe(2);
      expect(searchService.searchSource).toHaveBeenCalledWith('', 1, countPerPage);
    }));

    // it('should load next page on request',  fakeAsync(() => {
    //     component.scrolledDown = true;
    //     tick(1000);
    //     expect(searchService.searchSource.calls.count()).toBe(1);
    //     expect(searchService.searchSource).toHaveBeenCalledWith('', 1, 10);
    // }));

    it('check rendered items', () => {
      const items = fixture.debugElement.query(By.directive(MockFilterItem));
    });
   });

   class Page {
     queryInput:    HTMLInputElement;

     constructor() {
     }
     /** Add page elements after hero arrives */
     addPageElements() {
         this.queryInput   = fixture.debugElement.query(By.css('input')).nativeElement;
     }
   }

     @Directive({
      selector: 'filter-item'
    })
    class MockFilterItem {
        @Input() itemTemplate: TemplateRef<any>;
        @Input() item: Object;
        @Input() checked: boolean = false;
        @Output() checkedChange: EventEmitter<any> = new EventEmitter();
    }
});

export function fireEvent (target, action) {
  const event = document.createEvent('Event');
  event.initEvent(action, false, true);
  target.dispatchEvent(event);
};
