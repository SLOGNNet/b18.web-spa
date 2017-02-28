import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BdResizerComponent } from './bd-resizer.component';
import { BdResizeContainerComponent } from './components';
import { fireMouseEvent } from '../../test/helpers/domHelper';

describe('BdResizerComponent', () => {
  const toggleResizer = (resizer, offset) => {
    fireMouseEvent(resizer, 'mousedown');
    fireMouseEvent(resizer, 'mousemove', { clientX: offset });
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
