import { async, TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared.module';
import { BdInputComponent } from './bd-input.component';
// import { MdPlatform } from '../core/platform/platform';
import { PlatformModule } from '../core/platform/index';
import { fireMouseEvent, fireEvent } from '../../test/helpers/domHelper';



describe('BdInputComponent', function () {
  let fixture: ComponentFixture<BdInputComponent>,
  component: BdInputComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        // BdInputComponentPlaceholderRequiredTestComponent,
        // BdInputComponentPlaceholderElementTestComponent,
        // BdInputComponentPlaceholderAttrTestComponent,
        // BdInputComponentHintLabel2TestController,
        // BdInputComponentHintLabelTestController,
        // BdInputComponentInvalidTypeTestController,
        // BdInputComponentInvalidPlaceholderTestController,
        // BdInputComponentInvalidHint2TestController,
        // BdInputComponentInvalidHintTestController,
        // BdInputComponentBaseTestController,
        // BdInputComponentWithId,
        // BdInputComponentDateTestController,
        // BdInputComponentTextTestController,
        // BdInputComponentPasswordTestController,
        // BdInputComponentNumberTestController,
        // MdTextareaWithBindings,
        // BdInputComponentWithDisabled,
        // BdInputComponent
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


  it('should handle blur and add bd expanded input class', () => {
  const testFixture = TestBed.createComponent(TestBdInputComponent);
  testFixture.detectChanges();
  let componentContainer = testFixture.debugElement.query(By.css('.bd-input-wrapper'));
  let inputEl = testFixture.debugElement.query(By.css('input'));
  fireEvent(inputEl.nativeElement, 'focus');
   testFixture.detectChanges();
   expect(componentContainer.nativeElement.classList.contains('bd-expanded-input')).toBeTruthy();
   expect(componentContainer.nativeElement.classList.contains('bd-focused')).toBeTruthy();
   fireEvent(inputEl.nativeElement, 'blur');
   testFixture.detectChanges();
   expect(componentContainer.nativeElement.classList.contains('bd-expanded-input')).toBeTruthy();
  });

  it('should not be empty after input entered', () => {
    const testFixture = TestBed.createComponent(TestBdInputComponent);
    testFixture.detectChanges();
    let inputEl = testFixture.debugElement.query(By.css('.bd-input-infix')).query(By.css('input'));
    inputEl.nativeElement.value = 'added input value';
    inputEl.nativeElement.click();
    inputEl.triggerEventHandler('input', {target: inputEl.nativeElement});
    testFixture.detectChanges();
    expect(inputEl.nativeElement.value === 'added input value').toBeTruthy();
  });

  // md input tests

 //  it('should treat password input type as empty at init', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentPasswordTestController);
 //    fixture.detectChanges();
 //
 //    let el = fixture.debugElement.query(By.css('label')).nativeElement;
 //    expect(el).not.toBeNull();
 //    expect(el.classList.contains('md-empty')).toBe(true);
 //  });
 //
 //  it('should treat number input type as empty at init', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentNumberTestController);
 //    fixture.detectChanges();
 //
 //    let el = fixture.debugElement.query(By.css('label')).nativeElement;
 //    expect(el).not.toBeNull();
 //    expect(el.classList.contains('md-empty')).toBe(true);
 //  });
 //
 //  it('should add id', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentTextTestController);
 //    fixture.detectChanges();
 //
 //    const inputElement: HTMLInputElement =
 //        fixture.debugElement.query(By.css('input')).nativeElement;
 //    const labelElement: HTMLInputElement =
 //        fixture.debugElement.query(By.css('label')).nativeElement;
 //
 //    expect(inputElement.id).toBeTruthy();
 //    expect(inputElement.id).toEqual(labelElement.getAttribute('for'));
 //  });
 //
 //  it('should not overwrite existing id', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentWithId);
 //    fixture.detectChanges();
 //
 //    const inputElement: HTMLInputElement =
 //        fixture.debugElement.query(By.css('input')).nativeElement;
 //    const labelElement: HTMLInputElement =
 //        fixture.debugElement.query(By.css('label')).nativeElement;
 //
 //    expect(inputElement.id).toBe('test-id');
 //    expect(labelElement.getAttribute('for')).toBe('test-id');
 //  });
 //
 //  it('validates there\'s only one hint label per side', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentInvalidHintTestController);
 //
 //    expect(() => fixture.detectChanges()).toThrow();
 //    // TODO(jelbourn): .toThrow(new BdInputComponentDuplicatedHintError('start'));
 //    // See https://github.com/angular/angular/issues/8348
 //  });
 //
 //  it('validates there\'s only one hint label per side (attribute)', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentInvalidHint2TestController);
 //
 //    expect(() => fixture.detectChanges()).toThrow();
 //    // TODO(jelbourn): .toThrow(new BdInputComponentDuplicatedHintError('start'));
 //    // See https://github.com/angular/angular/issues/8348
 //  });
 //
 //  it('validates there\'s only one placeholder', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentInvalidPlaceholderTestController);
 //
 //    expect(() => fixture.detectChanges()).toThrow();
 //    // TODO(jelbourn): .toThrow(new BdInputComponentPlaceholderConflictError());
 //    // See https://github.com/angular/angular/issues/8348
 //  });
 //
 //  it('validates the type', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentInvalidTypeTestController);
 //
 //    // Technically this throws during the OnChanges detection phase,
 //    // so the error is really a ChangeDetectionError and it becomes
 //    // hard to build a full exception to compare with.
 //    // We just check for any exception in this case.
 //    expect(() => fixture.detectChanges()).toThrow(
 //        /* new BdInputComponentUnsupportedTypeError('file') */);
 //  });
 //
 //  it('supports hint labels attribute', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentHintLabelTestController);
 //    fixture.detectChanges();
 //
 //    // If the hint label is empty, expect no label.
 //    expect(fixture.debugElement.query(By.css('.md-hint'))).toBeNull();
 //
 //    fixture.componentInstance.label = 'label';
 //    fixture.detectChanges();
 //    expect(fixture.debugElement.query(By.css('.md-hint'))).not.toBeNull();
 //  });
 //
 //  it('supports hint labels elements', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentHintLabel2TestController);
 //    fixture.detectChanges();
 //
 //    // In this case, we should have an empty <md-hint>.
 //   let el = fixture.debugElement.query(By.css('md-hint')).nativeElement;
 //    expect(el.textContent).toBeFalsy();
 //
 //    fixture.componentInstance.label = 'label';
 //    fixture.detectChanges();
 //    el = fixture.debugElement.query(By.css('md-hint')).nativeElement;
 //    expect(el.textContent).toBe('label');
 //  });
 //
 //  it('supports placeholder attribute', async(() => {
 //   let fixture = TestBed.createComponent(BdInputComponentPlaceholderAttrTestComponent);
 //    fixture.detectChanges();
 //
 //    let el = fixture.debugElement.query(By.css('label'));
 //    expect(el).toBeNull();
 //
 //    fixture.componentInstance.placeholder = 'Other placeholder';
 //    fixture.detectChanges();
 //
 //    el = fixture.debugElement.query(By.css('label'));
 //    expect(el).not.toBeNull();
 //    expect(el.nativeElement.textContent).toMatch('Other placeholder');
 //    expect(el.nativeElement.textContent).not.toMatch(/\*/g);
 //  }));
 //
 //  it('supports placeholder element', async(() => {
 //    let fixture = TestBed.createComponent(BdInputComponentPlaceholderElementTestComponent);
 //    fixture.detectChanges();
 //
 //    let el = fixture.debugElement.query(By.css('label'));
 //    expect(el).not.toBeNull();
 //    expect(el.nativeElement.textContent).toMatch('Default Placeholder');
 //
 //    fixture.componentInstance.placeholder = 'Other placeholder';
 //    fixture.detectChanges();
 //
 //   el = fixture.debugElement.query(By.css('label'));
 //    expect(el).not.toBeNull();
 //    expect(el.nativeElement.textContent).toMatch('Other placeholder');
 //    expect(el.nativeElement.textContent).not.toMatch(/\*/g);
 //  }));
 //
 //  it('supports placeholder required star', () => {
 //    let fixture = TestBed.createComponent(BdInputComponentPlaceholderRequiredTestComponent);
 //    fixture.detectChanges();
 //
 //    let el = fixture.debugElement.query(By.css('label'));
 //    expect(el).not.toBeNull();
 //   expect(el.nativeElement.textContent).toMatch(/hello\s0\*/g);
 //  });
 //
 //  it('supports the disabled attribute', async(() => {
 //    let fixture = TestBed.createComponent(BdInputComponentWithDisabled);
 //    fixture.detectChanges();
 //
 //    let underlineEl = fixture.debugElement.query(By.css('.md-input-underline')).nativeElement;
 //    expect(underlineEl.classList.contains('md-disabled')).toBe(false, 'should not be disabled');
 //
 //   fixture.componentInstance.disabled = true;
 //    fixture.detectChanges();
 //    expect(underlineEl.classList.contains('md-disabled')).toBe(true, 'should be disabled');
 //  }));
 //
 // it('supports textarea', () => {
 //    let fixture = TestBed.createComponent(MdTextareaWithBindings);
 //    fixture.detectChanges();
 //
 //    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
 //    expect(textarea).not.toBeNull();
 //  });

 // it('should default to floating placeholders', () => {
 //   let fixture = TestBed.createComponent(BdInputComponentBaseTestController);
 //   fixture.detectChanges();
 //
 //   let inputContainer = fixture.debugElement.query(By.directive(BdInputComponent))
 //       .componentInstance as BdInputComponent;
 //   expect(inputContainer.floatingPlaceholder).toBe(true,
 //       'Expected BdInputComponent to default to having floating placeholders turned on');
 // });

 // it('should not be treated as empty if type is date',
 //     inject([MdPlatform], (platform: MdPlatform) => {
 //       if (!(platform.TRIDENT || platform.FIREFOX)) {
 //         let fixture = TestBed.createComponent(BdInputComponentDateTestController);
 //         fixture.detectChanges();
 //
 //         let el = fixture.debugElement.query(By.css('label')).nativeElement;
 //         expect(el).not.toBeNull();
 //         expect(el.classList.contains('md-empty')).toBe(false);
 //       }
 //     }));

 // Firefox and IE don't support type="date" and fallback to type="text".
 // it('should be treated as empty if type is date on Firefox and IE',
 //     inject([MdPlatform], (platform: MdPlatform) => {
 //       if (platform.TRIDENT || platform.FIREFOX) {
 //         let fixture = TestBed.createComponent(BdInputComponentDateTestController);
 //         fixture.detectChanges();
 //
 //         let el = fixture.debugElement.query(By.css('label')).nativeElement;
 //         expect(el).not.toBeNull();
 //         expect(el.classList.contains('md-empty')).toBe(true);
 //       }
 //     }));
});

// @Component({
//   template: `
//     <md-input-container>
//       <input md-input id="test-id" placeholder="test">
//     </md-input-container>`
// })
// class BdInputComponentWithId {}

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

// @Component({
//   template: `<md-input-container><input md-input required placeholder="hello"></md-input-container>`
// })
// class BdInputComponentPlaceholderRequiredTestComponent {}

// @Component({
//   template: `
//     <md-input-container>
//       <input md-input>
//       <md-placeholder>{{placeholder}}</md-placeholder>
//     </md-input-container>`
// })
// class BdInputComponentPlaceholderElementTestComponent {
//   placeholder: string = 'Default Placeholder';
// }

// @Component({
//   template: `<md-input-container><input md-input [placeholder]="placeholder"></md-input-container>`
// })
// class BdInputComponentPlaceholderAttrTestComponent {
//   placeholder: string = '';
// }

// @Component({
//   template: `<md-input-container><input md-input><md-hint>{{label}}</md-hint></md-input-container>`
// })
// class BdInputComponentHintLabel2TestController {
//   label: string = '';
// }

// @Component({
//   template: `<md-input-container [hintLabel]="label"><input md-input></md-input-container>`
// })
// class BdInputComponentHintLabelTestController {
//  label: string = '';
// }

// @Component({
//   template: `<md-input-container><input md-input type="file"></md-input-container>`
// })
// class BdInputComponentInvalidTypeTestController {}

// @Component({
//   template: `
//     <md-input-container>
//       <input md-input placeholder="Hello">
//       <md-placeholder>World</md-placeholder>
//     </md-input-container>`
// })
// class BdInputComponentInvalidPlaceholderTestController {}

// @Component({
//   template: `
//     <md-input-container hintLabel="Hello">
//       <input md-input>
//       <md-hint>World</md-hint>
//     </md-input-container>`
// })
// class BdInputComponentInvalidHint2TestController {}

// @Component({
//   template: `
//     <md-input-container>
//       <input md-input>
//       <md-hint>Hello</md-hint>
//       <md-hint>World</md-hint>
//     </md-input-container>`
// })
// class BdInputComponentInvalidHintTestController {}

// @Component({
//   template: `<md-input-container><input md-input [(ngModel)]="model"></md-input-container>`
// })
// class BdInputComponentBaseTestController {
//  model: any = '';
// }

// @Component({
//   template: `
//     <md-input-container>
//       <input md-input type="date" placeholder="Placeholder">
//     </md-input-container>`
// })
// class BdInputComponentDateTestController {}

// @Component({
//   template: `
//     <md-input-container>
//       <input md-input type="text" placeholder="Placeholder">
//     </md-input-container>`
// })
// class BdInputComponentTextTestController {}

// @Component({
//   template: `
//     <md-input-container>
//       <input md-input type="password" placeholder="Placeholder">
//     </md-input-container>`
// })
// class BdInputComponentPasswordTestController {}

// @Component({
//   template: `
//     <md-input-container>
//       <input md-input type="number" placeholder="Placeholder">
//     </md-input-container>`
// })
// class BdInputComponentNumberTestController {}
//
// @Component({
//   template: `
//     <md-input-container>
//       <textarea md-input [rows]="rows" [cols]="cols" [wrap]="wrap" placeholder="Snacks"></textarea>
//     </md-input-container>`
// })
// class MdTextareaWithBindings {
//   rows: number = 4;
//   cols: number = 8;
//   wrap: string = 'hard';
// }
