import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared.module';
import { BdInputComponent } from './bd-input.component';
import { fireEvent } from '../../test/helpers/domHelper';



describe('BdInputComponent', function() {
  let fixture: ComponentFixture<BdInputComponent>,
    component: BdInputComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        TestBdTextArea,
        TestBdInputComponent,
        TestBdInputComponentWithLabel,
        TestBdInputComponentWithSuffix,
        TestBdInputComponentWithPrefix,
        TestBdInputComponentWithLabelAndCollapsibleInputPropertyFalse
      ],
    });
    fixture = TestBed.createComponent(BdInputComponent);
    component = fixture.componentInstance;
    TestBed.compileComponents();
  }));

  // bd-input
  it('should have a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should hide label when label text is empty', () => {
    let componentContainer = fixture.debugElement.query(By.css('.bd-input-wrapper'));
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.bd-label')).nativeElement;
    expect(element.classList.contains('bd-hidden-label')).toBe(true);
    expect(componentContainer.nativeElement.classList.contains('bd-not-empty-label')).toBeFalsy();
  });

  it('should show label when label text is not empty and container contains bd-not-empty-label class', () => {
    let testLabelText = 'label text';
    component.labelText = testLabelText;
    let componentContainer = fixture.debugElement.query(By.css('.bd-input-wrapper'));
    fixture.detectChanges();
    let label = fixture.debugElement.query(By.css('.bd-input-placeholder'));
    expect(label.nativeElement.textContent).toMatch(testLabelText);
    expect(componentContainer.nativeElement.classList.contains('bd-not-empty-label')).toBeTruthy();
  });

  it('should contain prefix', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponentWithPrefix);
    testFixture.detectChanges();
    let prefix = testFixture.nativeElement.querySelector('.bd-input-prefix').querySelector('.prefix');
    expect(prefix).toBeDefined();
    expect(prefix.textContent).toMatch('prefix');
  });

  it('should contain suffix', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponentWithSuffix);
    testFixture.detectChanges();
    let suffix = testFixture.nativeElement.querySelector('.bd-input-suffix').querySelector('.suffix');
    expect(suffix).toBeDefined();
    expect(suffix.textContent).toMatch('suffix');
  });

  it('should not contain prefix', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponent);
    testFixture.detectChanges();
    let prefix = testFixture.nativeElement.querySelector('.bd-input-prefix');
    expect(prefix === null).toBeTruthy();
  });

  it('should not contain suffix', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponent);
    testFixture.detectChanges();
    let suffix = testFixture.nativeElement.querySelector('.bd-input-suffix');
    expect(suffix === null).toBeTruthy();
  });

  it('should render input', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponent);
    testFixture.detectChanges();
    let inputEl = testFixture.debugElement.query(By.css('.bd-input-infix')).query(By.css('input'));
    expect(inputEl).toBeDefined();
  });

  it('should render textarea', () => {
    const testFixture = TestBed.createComponent(TestBdTextArea);
    testFixture.detectChanges();
    let textareaEl = testFixture.debugElement.query(By.css('.bd-input-infix')).query(By.css('textarea'));
    expect(textareaEl).toBeDefined();
  });

  it('should display placeholder', () => {
    let testPlaceholder = 'test placeholder';
    component.placeholder = testPlaceholder;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.bd-input-element'));
    expect(element.nativeElement.placeholder).toMatch(testPlaceholder);
  });

  it('should handle change', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponent);
    testFixture.detectChanges();
    let inputEl = testFixture.debugElement.query(By.css('input'));
    inputEl.nativeElement.value = 'added input value';
    fireEvent(inputEl.nativeElement, 'change');
    expect(inputEl.nativeElement.value === 'added input value').toBeTruthy();
  });

  it('should be expanded when label empty', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponent);
    testFixture.detectChanges();
    let componentContainer = testFixture.debugElement.query(By.css('.bd-input-wrapper'));
    expect(componentContainer.nativeElement.classList.contains('bd-expanded-input')).toBeTruthy();
  });

  it('should be collapsed when label set', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponentWithLabel);
    testFixture.detectChanges();
    let componentContainer = testFixture.debugElement.query(By.css('.bd-input-wrapper'));
    expect(componentContainer.nativeElement.classList.contains('bd-collapsed-input')).toBeTruthy();
  });

  it('should be expanded when focused and label set', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponentWithLabel);
    testFixture.detectChanges();
    let element = testFixture.debugElement.query(By.css('.bd-input-wrapper'));
    let inputEl = testFixture.debugElement.query(By.css('input'));
    fireEvent(inputEl.nativeElement, 'focus');
    testFixture.detectChanges();
    expect(element.nativeElement.classList.contains('bd-expanded-input')).toBeTruthy();
  });

  it('should be collapsed on blur', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponentWithLabel);
    testFixture.detectChanges();
    let componentContainer = testFixture.debugElement.query(By.css('.bd-input-wrapper'));
    let inputEl = testFixture.debugElement.query(By.css('input'));
    fireEvent(inputEl.nativeElement, 'focus');
    testFixture.detectChanges();
    expect(componentContainer.nativeElement.classList.contains('bd-expanded-input')).toBeTruthy();
    expect(componentContainer.nativeElement.classList.contains('bd-focused')).toBeTruthy();
    fireEvent(inputEl.nativeElement, 'blur');
    testFixture.detectChanges();
    expect(componentContainer.nativeElement.classList.contains('bd-collapsed-input')).toBeTruthy();
  });

  it('should not be collapsed when text is not empty', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponent);
    testFixture.detectChanges();
    let componentContainer = testFixture.debugElement.query(By.css('.bd-input-wrapper'));
    let inputEl = testFixture.debugElement.query(By.css('.bd-input-infix')).query(By.css('input'));
    inputEl.nativeElement.value = 'added input value';
    expect(componentContainer.nativeElement.classList.contains('bd-collapsed-input')).toBeFalsy();
  });

  it('should be expanded when collapsibleInput is false', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponentWithLabelAndCollapsibleInputPropertyFalse);
    testFixture.detectChanges();
    let componentContainer = testFixture.debugElement.query(By.css('.bd-input-wrapper'));
    expect(componentContainer.nativeElement.classList.contains('bd-expanded-input')).toBeTruthy();
  });

  it('should not be empty after input entered', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponent);
    testFixture.detectChanges();
    let inputEl = testFixture.debugElement.query(By.css('.bd-input-infix')).query(By.css('input'));
    inputEl.nativeElement.value = 'added input value';
    inputEl.nativeElement.click();
    inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
    testFixture.detectChanges();
    expect(inputEl.nativeElement.value === 'added input value').toBeTruthy();
  });

});

@Component({
  template: `
 <bd-input>
 </bd-input>`
})
class TestBdInputComponent {

}

@Component({
  template: `
 <bd-input>
 <span class="suffix" bd-suffix>suffix</span>
 </bd-input>`
})
class TestBdInputComponentWithSuffix {

}

@Component({
  template: `
 <bd-input>
 <span class="prefix" bd-prefix>prefix</span>
 </bd-input>`
})
class TestBdInputComponentWithPrefix {

}

@Component({
  template: `
 <bd-textarea>
 </bd-textarea>`
})
class TestBdTextArea {

}

@Component({
  template: `
 <bd-input
 [labelText]="'label text'"
 >
 </bd-input>`
})
class TestBdInputComponentWithLabel {

}

@Component({
  template: `
 <bd-input
 [collapsibleInput]="false"
 [labelText]="'label text'"
 >
 </bd-input>`
})
class TestBdInputComponentWithLabelAndCollapsibleInputPropertyFalse {

}
