import { AutocompleteFilter, FilterItem } from '../index';
import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Input, Output, EventEmitter, Directive, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { getPaginated } from '../../../../helpers';
import { isEqualWith } from 'lodash';

import { SharedModule } from '../../../../shared.module';
describe('autocomplete-filter', () => {

  let component:    AutocompleteFilter;
  let searchService;
  let testCountPerPage = 2;
  let fixture: ComponentFixture<AutocompleteFilter>;
  let de:      DebugElement;
  let page: Page;
  const comparer = (val, otherVal) => val['id'] === otherVal['id'];

  const testData = [{ id: 1, name: 'test'}, { id: 2, name: 'test1'}, { id: 3, name: 'test2'},
    {id: 4, name: 'test3'}, {id: 5, name: 'test4'}];

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [SharedModule]});
   // rxjs async issue, can't use delay https://github.com/angular/angular/issues/10127
    Observable.prototype.debounceTime = function () { return this; };
    fixture = TestBed.createComponent(AutocompleteFilter);
    component = fixture.componentInstance;
    component.active = true;
    component.countPerPage = testCountPerPage;
    searchService = {
      searchSource: (query: string, pageNumber: number, count: number) =>
        {
          return Observable.of(getPaginated(testData, pageNumber, count));
        }
    };
    spyOn(searchService, 'searchSource').and.callThrough();
    page = new Page();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  fdescribe('data loading', () => {
    beforeEach(() => {
      component.autocompleteSearchSource = searchService.searchSource;
      component.debounceTime = 0;
      fixture.detectChanges();
    });

    it('should load initial data on init', fakeAsync(() => {
      fixture.detectChanges();
      expect(searchService.searchSource.calls.count()).toBe(1);
      expect(searchService.searchSource).toHaveBeenCalledWith('', 1, testCountPerPage);
      expectItems([], testData.slice(0, 2), []);
    }));

    describe('search', () => {
        // async rxjs calls need to be fixed first
        xit('should clear data on start search', fakeAsync(() => {
          const query = 'testquery';
          page.searchQuery(query);
          fixture.detectChanges();
          expectItems([], [], []);
        }));

        it('should start load data with query', fakeAsync(() => {
          const query = 'testquery';
          page.searchQuery(query);
          fixture.detectChanges();
          tick();
          expect(searchService.searchSource.calls.count()).toBe(2);
          expect(searchService.searchSource).toHaveBeenCalledWith(query, 1, testCountPerPage);
        }));

        it('should render new items after search', fakeAsync(() => {
          const searchedData = [testData[2], testData[3]];
          searchService.searchSource.and.returnValue(searchedData);
          const query = 'testquery';

          page.searchQuery(query);
          fixture.detectChanges();
          tick();
          expectItems([], [], searchedData);
        }));

        it('should start new load if new search requested before previous succeeded', fakeAsync(() => {
          const query = 'testquery';
          page.searchQuery(query);
          const query1 = 'testquery1';
          page.searchQuery(query1);
          fixture.detectChanges();
          tick();

          expect(searchService.searchSource.calls.count()).toBe(3);
          expect(searchService.searchSource).toHaveBeenCalledWith(query1, 1, testCountPerPage);
        }));
    });

    describe('load next page', () => {
      beforeEach(() => {
        searchService.searchSource.calls.reset();
      });

      it('should start when new page requested', fakeAsync(() => {
        component.scrolledDown = true;
        fixture.detectChanges();
        tick();
        expect(searchService.searchSource.calls.count()).toBe(1);
        expect(searchService.searchSource).toHaveBeenCalledWith('', 2, testCountPerPage);
      }));

      it('should reset current page number when new search started', fakeAsync(() => {
        tick();
        component.scrolledDown = true;
        fixture.detectChanges();
        tick();
        expect(searchService.searchSource.calls.count()).toBe(1);
        const query = 'testquery';
        page.searchQuery(query);
        tick();
        expect(searchService.searchSource.calls.count()).toBe(2);
        expect(searchService.searchSource).toHaveBeenCalledWith(query, 1, testCountPerPage);
      }));

      it('should not start paged load when filter not active', fakeAsync(() => {
        component.active = false;
        component.scrolledDown = true;
        fixture.detectChanges();
        tick();
        expect(searchService.searchSource.calls.count()).toBe(0);
      }));

      it('should render paged items', fakeAsync(() => {
        expectItems([], testData.slice(0, 2), []);
        component.scrolledDown = true;
        fixture.detectChanges();
        tick();
        expectItems([], testData.slice(0, 4), []);
      }));
    });

    describe('selection', () => {
      it('should select items', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        expectedSelected([testData[selectIndex]]);
      }));

      it('should deselect items on second selection', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        page.selectItem(selectIndex);
        expectedSelected([]);
      }));

      it('should not move items to selected immediatley', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        expectItems([], testData.slice(0, 2), []);
      }));

      it('should move items to selected section after reopening', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        page.reopenFilter();
        fixture.detectChanges();
        expectItems([testData[0]], [testData[1]], []);
      }));

      it('should not remove items from selected section immedialtey', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        page.reopenFilter();

        page.selectItem(selectIndex);
        expectItems([testData[0]], [testData[1]], []);
      }));

      it('should not move items to selected immediatley on search', fakeAsync(() => {
        const query = 'testquery';
        page.searchQuery(query);
        const selectIndex = 1;
        page.selectItem(selectIndex);
        expectItems([], [], testData.slice(0, 2));
        expectedSelected([testData[selectIndex]]);
      }));

      it('should not move items to selected after reopen on search', fakeAsync(() => {
        const query = 'testquery';
        page.searchQuery(query);
        const selectIndex = 1;
        page.selectItem(selectIndex);
        page.reopenFilter();

        expectItems([], [], testData.slice(0, 2));
        expectedSelected([testData[selectIndex]]);
      }));
    });

    describe('headers', () => {
      it('should show all-header-section on open', fakeAsync(() => {
        debugger;
        expect(page.allHeaderSection).toBeDefined()
        expect(page.selectedHeaderSection).toBeNull();
      }));

      it('should not show selected header immediatley', fakeAsync(() => {
        page.selectItem(1);
        expect(page.allHeaderSection).toBeDefined();
        expect(page.selectedHeaderSection).toBeNull();
      }));

     it('should show selected header with enabled deselect button after reopen', fakeAsync(() => {
        page.selectItem(1);
        page.reopenFilter();
        fixture.detectChanges();
        expect(page.allHeaderSection).toBeDefined();
        expect(page.selectedHeaderSection).toBeDefined();
        expect(page.unselectButton.disabled).toBe(false);
      }));

      it('should disable selected button when deselected', fakeAsync(() => {
        page.selectItem(1);
        page.reopenFilter();
        page.selectItem(1);
        fixture.detectChanges();
        debugger;
        expect(page.allHeaderSection).toBeDefined();
        expect(page.selectedHeaderSection).toBeDefined();
        expect(page.unselectButton.disabled).toBe(true);
      }));

      it('should not show headers on search', fakeAsync(() => {
        page.searchQuery('query');
        page.selectItem(1);
        fixture.detectChanges();
        expect(page.allHeaderSection).toBeNull();
        expect(page.selectedHeaderSection).toBeNull();
      }));

      it('should not show headers on search with after reopen', fakeAsync(() => {
        page.searchQuery('query');
        page.selectItem(1);
        page.reopenFilter();
        fixture.detectChanges();
        expect(page.allHeaderSection).toBeNull();
        expect(page.selectedHeaderSection).toBeNull();
      }));
    });
   });

   function expectItems(selected, all, search) {
     expectSearchItems(search);
     expectAllItems(all);
     expectSelectedItems(selected);
   }
   function expectSearchItems(expectedItems) {
     expectItemsEquality('.search-container', expectedItems);
   }
   function expectAllItems(expectedItems) {
     expectItemsEquality('.all-container', expectedItems);
   }
   function expectSelectedItems(expectedItems) {
     expectItemsEquality('.selected-container', expectedItems);
   }

   function expectItemsEquality(containerClass, expectedItems) {
     const container = fixture.debugElement.query(By.css(containerClass));
     const actualNodes = container ? container.queryAll(By.directive(FilterItem)) : [];
     const actualItems = actualNodes.map(n => n.componentInstance.item);
     expect(isEqualWith(actualItems, expectedItems, comparer)).toBe(true);
   }

   function expectedSelected(expectedSelectedItems) {
     const actualSelectedItems = component.selectedItems;
     expect(isEqualWith(actualSelectedItems, expectedSelectedItems, comparer)).toBe(true);
   }

   class Page {
     reopenFilter() {
       component.active = false;
       component.active = true;
     }

     searchQuery(query: string): void{
       this.queryInput.value = query;
       fireEvent(page.queryInput, 'keyup');
     }

     selectItem(index): void {
       const filterItemInstance = fixture.debugElement.queryAll(By.directive(FilterItem))
        .map(n => n.componentInstance)[index];
        debugger;
      filterItemInstance.checkedChange.emit(filterItemInstance.item);
     }

     get queryInput(): HTMLInputElement {
       const element = fixture.debugElement.query(By.css('input'));
      return element && element.nativeElement;
     }

     get allHeaderSection(): HTMLElement {
       const element = fixture.debugElement.query(By.css('.all-section-header'));
       return element && element.nativeElement;
     }

     get selectedHeaderSection(): HTMLElement {
       const element = fixture.debugElement.query(By.css('.selected-section-header'));
       return element && element.nativeElement;
     }

     get unselectButton(): HTMLButtonElement {
       const element = fixture.debugElement.query(By.css('.clear-selected-button'));
       return element && element.nativeElement;
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
