import { AutocompleteFilter, FilterItem } from '../index';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { getPaginated } from '../../../../helpers';
import { fireEvent } from '../../../../test/helpers/domHelper';
import { isEqualWith, identity, curry, isEmpty, differenceBy } from 'lodash';
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

  describe('data loading', () => {
    beforeEach(() => {
      component.autocompleteSearchSource = searchService.searchSource;
      component.debounceTime = 0;
      fixture.detectChanges();
    });

    it('should load initial data on init', fakeAsync(() => {
      fixture.detectChanges();
      expect(searchService.searchSource.calls.count()).toBe(1);
      expect(searchService.searchSource).toHaveBeenCalledWith('', 1, testCountPerPage);
      expectSectionItems([], testData.slice(0, 2), []);
    }));

    describe('search', () => {
        // async rxjs calls need to be fixed first
        xit('should clear data on start search', fakeAsync(() => {
          const query = 'testquery';
          page.searchQuery(query);
          fixture.detectChanges();
          expectSectionItems([], [], []);
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
          expectSectionItems([], [], searchedData);
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
        page.requestNextPage();
        fixture.detectChanges();
        tick();
        expect(searchService.searchSource.calls.count()).toBe(1);
        expect(searchService.searchSource).toHaveBeenCalledWith('', 2, testCountPerPage);
      }));

      it('should reset current page number when new search started', fakeAsync(() => {
        tick();
        page.requestNextPage();
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
        page.requestNextPage();
        fixture.detectChanges();
        tick();
        expect(searchService.searchSource.calls.count()).toBe(0);
      }));

      it('should render paged items', fakeAsync(() => {
        expectSectionItems([], testData.slice(0, 2), []);
        page.requestNextPage();
        fixture.detectChanges();
        tick();
        expectSectionItems([], testData.slice(0, 4), []);
      }));
    });

    describe('selection', () => {
      it('should select items', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        fixture.detectChanges();
        expectedSelected([testData[selectIndex]]);
        expectCheckedSectionItems([], [testData[selectIndex]], []);
      }));

      it('should deselect items on second selection', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        fixture.detectChanges();
        page.selectItem(selectIndex);
        fixture.detectChanges();
        expectedSelected([]);
        expectCheckedSectionItems([], [], []);
      }));

      it('should preserve selection on next page load', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        page.requestNextPage();
        fixture.detectChanges();

        expectedSelected([testData[selectIndex]]);
      }));
      it('should not move items to selected section immediatley', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        fixture.detectChanges();
        expectSectionItems([], testData.slice(0, 2), []);
        expectCheckedSectionItems([], [testData[selectIndex]], []);
      }));

      it('should move items to selected section after reopening', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        page.reopenFilter();
        fixture.detectChanges();
        expectSectionItems([testData[1]], [testData[0]], []);
        expectCheckedSectionItems([testData[selectIndex]], [], []);
      }));

      it('should not remove items from selected section immediatley', fakeAsync(() => {
        const selectIndex = 1;
        page.selectItem(selectIndex);
        fixture.detectChanges();
        page.reopenFilter();
        page.selectItem(selectIndex);
        fixture.detectChanges();
        expectSectionItems([testData[1]], [testData[0]], []);
        expectCheckedSectionItems([], [], []);
      }));

      it('should not move items to selected section immediatley when search mode', fakeAsync(() => {
        const query = 'testquery';
        page.searchQuery(query);
        const selectIndex = 1;
        page.selectItem(selectIndex);
        fixture.detectChanges();
        expectSectionItems([], [], testData.slice(0, 2));
        expectedSelected([testData[selectIndex]]);
        expectCheckedSectionItems([], [], [testData[selectIndex]]);
      }));

      it('should not move items to selected after reopen when search mode', fakeAsync(() => {
        const query = 'testquery';
        page.searchQuery(query);
        const selectIndex = 1;
        page.selectItem(selectIndex);
        page.reopenFilter();
        fixture.detectChanges();
        expectSectionItems([], [], testData.slice(0, 2));
        expectedSelected([testData[selectIndex]]);
      }));
    });

    describe('headers', () => {
      it('should show all-header-section on open', fakeAsync(() => {
        expect(page.allHeaderSection).toBeDefined();
        expect(page.selectedHeaderSection).toBeNull();
      }));

      it('should not show selected header immediatley', fakeAsync(() => {
        page.selectItem(1);
        fixture.detectChanges();
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

   class Page {
     public static selectedSectionSelector = '.selected-container';
     public static allSectionSelector = '.all-container';
     public static searchSectionSelector = '.search-container';
     reopenFilter() {
       component.active = false;
       component.active = true;
     }

     requestNextPage() {
       component.scrolledDown = true;
       component.scrolledDown = false;
     }

     searchQuery(query: string): void{
       this.queryInput.value = query;
       fireEvent(page.queryInput, 'keyup');
     }

     selectItem(index): void {
       const filterItemInstance = fixture.debugElement.queryAll(By.directive(FilterItem))
        .map(n => n.componentInstance)[index];
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

   const expectItemsEquality =  curry(function(containerClass, nodeFilter, expectedItems ) {
     const container = fixture.debugElement.query(By.css(containerClass));
     const actualNodes = container ? container.queryAll(By.directive(FilterItem)) : [];
     const actualItems = actualNodes
      .map(n => n.componentInstance)
      .filter(nodeFilter)
      .map(n => n.item);
     const test = isEqualWith;
     expect(isArraysEqual(actualItems, expectedItems)).toBe(true);
   });

   const expectSearchSectionItems = expectItemsEquality(Page.searchSectionSelector)(identity);
   const expectAllSectionItems = expectItemsEquality(Page.allSectionSelector, identity);
   const expectSelectedSectionItems = expectItemsEquality(Page.selectedSectionSelector, identity);
   function expectSectionItems(selected, all, search) {
     expectSearchSectionItems(search);
     expectAllSectionItems(all);
     expectSelectedSectionItems(selected);
   }

   const checkedItemComponentFilter = (fitlerComp: FilterItem) => fitlerComp.checked;
   const expectSelectedSearchSectionItems = expectItemsEquality(Page.searchSectionSelector, checkedItemComponentFilter);
   const expectSelectedAllSectionItems = expectItemsEquality(Page.allSectionSelector, checkedItemComponentFilter);
   const expectSelectedSelectedSectionItems = expectItemsEquality(Page.selectedSectionSelector, checkedItemComponentFilter);
   function expectCheckedSectionItems(selected, all, search) {
     expectSelectedSearchSectionItems(search);
     expectSelectedAllSectionItems(all);
     expectSelectedSelectedSectionItems(selected);
   }
   function expectedSelected(expectedSelectedItems) {
     const actualSelectedItems = component.selectedItems;
     expect(isArraysEqual(actualSelectedItems, expectedSelectedItems)).toBe(true);
   }
});

 function isArraysEqual(x, y) {
  const swap = x;
  if (x.length <= y.length) {
    x = y;
    y = swap;
   }
   return isEmpty(differenceBy(x, y, 'id'));
};
