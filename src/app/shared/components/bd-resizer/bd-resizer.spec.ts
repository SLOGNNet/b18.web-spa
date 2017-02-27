import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppState } from '../app.service';
import { BdResizerComponent } from './bd-resizer.component';
import { BdResizeContainerComponent } from './components';

describe('BdResizerComponent', () => {
  const toggleResizer = (resizer, offset) => {
    let startMouseDownEvent = document.createEvent('MouseEvents');
    startMouseDownEvent.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    let endMouseMoveEvent = document.createEvent('MouseEvents');
    endMouseMoveEvent.initMouseEvent('mousemove', true, true, window, 0, 0, 0, offset, 0, false, false, false, false, 0, null);

    resizer.dispatchEvent(startMouseDownEvent);
    resizer.dispatchEvent(endMouseMoveEvent);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BdResizerComponent, BdResizeContainerComponent, TwoPanesTestComponent, ThreePanesTestComponent]
    })
      .compileComponents();
  }));

  it('should resize first and second panes', () => {
    const fixture = TestBed.createComponent(TwoPanesTestComponent);
    fixture.detectChanges();

    const offset = 50;
    const resizer = fixture.nativeElement.querySelector('bd-resizer');
    const firstPane = fixture.nativeElement.querySelector('.first');
    const secondPane = fixture.nativeElement.querySelector('.second');
    const firstPaneInitialWidth = firstPane.clientWidth;
    const secondPaneInitialWidth = secondPane.clientWidth;
    let startMouseDownEvent = document.createEvent('MouseEvents');

    toggleResizer(resizer, offset);

    expect(firstPane.clientWidth === firstPaneInitialWidth + offset).toBeTruthy();
    expect(secondPane.clientWidth === secondPaneInitialWidth - offset).toBeTruthy();
  });

  it('should resize first and second panes and not third one', () => {
    const fixture = TestBed.createComponent(ThreePanesTestComponent);
    fixture.detectChanges();

    const offset = 50;
    const resizer = fixture.nativeElement.querySelector('bd-resizer');
    const firstPane = fixture.nativeElement.querySelector('.first');
    const secondPane = fixture.nativeElement.querySelector('.second');
    const thirdPane = fixture.nativeElement.querySelector('.third');
    const firstPaneInitialWidth = firstPane.clientWidth;
    const secondPaneInitialWidth = secondPane.clientWidth;
    const thirdPaneInitialWidth = secondPane.clientWidth;

    toggleResizer(resizer, offset);

    expect(firstPane.clientWidth === firstPaneInitialWidth + offset).toBeTruthy();
    expect(secondPane.clientWidth === secondPaneInitialWidth - offset).toBeTruthy();
    expect(thirdPane.clientWidth === thirdPaneInitialWidth).toBeTruthy();
  });
});

@Component({
  selector: 'two-panes-test',
  template:
  `<div>
      <bd-resize-container #first class="first" [width]="50"></bd-resize-container>
      <bd-resizer [resizerFirst]="first" [resizerSecond]="second"></bd-resizer>
      <bd-resize-container #second class="second" [width]="50"></bd-resize-container>
    <div>`
})
class TwoPanesTestComponent {

}

@Component({
  selector: 'three-panes-test',
  template:
  `<div>
      <bd-resize-container #first class="first" [width]="33"></bd-resize-container>
      <bd-resizer [resizerFirst]="first" [resizerSecond]="second"></bd-resizer>
      <bd-resize-container #second class="second" [width]="33"></bd-resize-container>
      <bd-resizer [resizerFirst]="second" [resizerSecond]="third"></bd-resizer>
      <bd-resize-container #third class="third" [width]="33"></bd-resize-container>
    <div>`
})
class ThreePanesTestComponent {

}
