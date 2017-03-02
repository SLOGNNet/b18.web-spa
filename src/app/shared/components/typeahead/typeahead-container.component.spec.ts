import { TestBed, ComponentFixture } from '@angular/core/testing';
import { asNativeElements } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadOptions } from './typeahead-options.class';
import { TypeaheadMatch } from './typeahead-match.class';

describe('Component: TypeaheadContainer', () => {
  let fixture: ComponentFixture<TypeaheadContainerComponent>;
  let component: TypeaheadContainerComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TypeaheadContainerComponent],
      providers: [{
        provide: TypeaheadOptions,
        useValue: new TypeaheadOptions({animation: false, placement: 'bottom-left', typeaheadRef: undefined})
      }]
    }).createComponent(TypeaheadContainerComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should have an \"element\" property', () => {
    expect(component.element).toBeTruthy();
  });

  it('should have an empty \"matches\" array', () => {
    expect(component.matches.length).toBe(0);
  });

  describe('dropdown-menu', () => {
    let dropDown: HTMLElement;

    beforeEach(() => {
      fixture.detectChanges();

      dropDown = fixture.debugElement.query(By.css('.dropdown-menu')).nativeElement as HTMLElement;
    });

    it('should be rendered', () => {
      expect(dropDown).toBeDefined();
    });
  });

  describe('matches', () => {
    let matches: HTMLLIElement[];

    beforeEach(() => {
      component.query = 'fo';
      component.matches = [
        new TypeaheadMatch({id: 0, name: 'foo'}, 'foo'),
        new TypeaheadMatch({id: 1, name: 'food'}, 'food')
      ];
      fixture.detectChanges();

      matches = asNativeElements(fixture.debugElement.queryAll(By.css('.dropdown-menu li')));
    });

    describe('rendering', () => {
      it('should render 2 matches', () => {
        expect(matches.length).toBe(2);
      });

      it('should set the \"active\" class on the first match', () => {
        expect(matches[0].classList.contains('active')).toBeTruthy();
      });

      it('should not set the \"active\" class on other matches', () => {
        expect(matches[1].classList.contains('active')).toBeFalsy();
      });
    });

    describe('nextActiveMatch', () => {
      it('should select the next match', () => {
        component.nextActiveMatch();

        expect(component.isActive(component.matches[1])).toBeTruthy();
      });

      it('should select the first match again, when triggered twice', () => {
        component.nextActiveMatch();
        component.nextActiveMatch();

        expect(component.isActive(component.matches[0])).toBeTruthy();
      });
    });

    describe('prevActiveMatch', () => {
      it('should select the previous (last) match', () => {
        component.prevActiveMatch();
        expect(component.isActive(component.matches[1])).toBeTruthy();
      });

      it('should select the first match again, when triggered twice', () => {
        component.prevActiveMatch();
        component.prevActiveMatch();

        expect(component.isActive(component.matches[0])).toBeTruthy();
      });
    });
  });

  describe('grouped matches', () => {
    let itemMatches: HTMLLIElement[];

    beforeEach(() => {
      component.query = 'a';
      component.matches = [
        new TypeaheadMatch('fruits', 'fruits'),
        new TypeaheadMatch({id: 0, name: 'banana', category: 'fruits'}, 'banana'),
        new TypeaheadMatch({id: 0, name: 'apple', category: 'fruits'}, 'apple')
      ];

      fixture.detectChanges();
      itemMatches = asNativeElements(fixture.debugElement.queryAll(By.css('.dropdown-menu li')));
    });

    describe('rendering', () => {
      it('should render 3 item matches', () => {
        expect(itemMatches.length).toBe(3);
      });

      it('should set the \"active\" class on the first item match', () => {
        expect(itemMatches[0].classList.contains('active')).toBeTruthy();
      });
    });

    describe('nextActiveMatch', () => {
      it('should select the next item match', () => {
        component.nextActiveMatch();

        expect(component.isActive(component.matches[1])).toBeTruthy();
      });

      it('should skip the header match, when triggered twice', () => {
        component.nextActiveMatch();
        component.nextActiveMatch();

        expect(component.isActive(component.matches[0])).toBeFalsy();
      });
    });

    describe('prevActiveMatch', () => {
      it('should skip the header match', () => {
        component.prevActiveMatch();
        expect(component.isActive(component.matches[0])).toBeFalsy();
      });

      it('should select the first match again, when triggered twice', () => {
        component.prevActiveMatch();
        component.prevActiveMatch();

        expect(component.isActive(component.matches[1])).toBeTruthy();
      });
    });
  });

  describe('isFocused', () => {
    it('should not be focus after init', () => {
      expect(component.isFocused).toBeFalsy();
    });

    it('should not be focused on focusLost()', () => {
      component.focusLost();

      expect(component.isFocused).toBeFalsy();
    });
  });

});
