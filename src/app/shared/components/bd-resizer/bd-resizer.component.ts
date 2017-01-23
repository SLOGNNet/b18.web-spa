import { Component, HostListener, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { BdResizeContainerComponent } from './components';

@Component({
  selector: 'bd-resizer',
  templateUrl: './bd-resizer.component.html',
  styleUrls: ['./bd-resizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdResizerComponent {
  @Input()
  resizerFirst: BdResizeContainerComponent;

  @Input()
  resizerSecond: BdResizeContainerComponent;

  @Input()
  resizerTop: BdResizeContainerComponent;

  @Input()
  resizerBottom: BdResizeContainerComponent;

  @Input()
  resizerWidth: number;

  @Input()
  resizer: string = 'horizontal';

  @Input()
  resizerMin: number = 0;

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  private start: number = undefined;
  private percentageDiff: number = undefined;
  private property: string = undefined;
  private minPersentage: number = undefined;
  private firstElement: HTMLElement = undefined;
  private secondElement: HTMLElement = undefined;

  ngOnInit() {
    this.property = this.resizer === 'horizontal' ? 'width' : 'height';

    if (this.resizerFirst instanceof BdResizeContainerComponent && this.resizerSecond instanceof BdResizeContainerComponent) {
      this.firstElement = this.resizerFirst.element.nativeElement;
      this.secondElement = this.resizerSecond.element.nativeElement;
    }
  }

  ngOnChanges(changes) {
    this.ngOnInit();
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(e) {
    if (!this.firstElement || !this.secondElement) {
      return;
    }

    if (this.resizer === 'horizontal') {
      this.start = e.clientX;
    } else {
      this.start = e.clientY;
    }

    let calculatedPercentage = this.calculatePercentage();
    this.percentageDiff = parseFloat(this.firstElement.style[this.property]) / calculatedPercentage;
    this.minPersentage = this.getMinPercentage();
  }

  @HostListener('window:mousemove', ['$event'])
  onMousemove(e) {
    if (this.start !== undefined) {
      this.resize(e, this.property);
    }
  }

  @HostListener('window:mouseup')
  onMouseup(e) {
    if (this.start !== undefined) {
      this.change.emit([this.firstElement.style[this.property], this.secondElement.style[this.property]]);
    }

    this.start = undefined;
  }

  private resize(e, property) {
      const offset = this.start - (this.resizer === 'horizontal' ? e.clientX : e.clientY);
      this.start = (this.resizer === 'horizontal' ? e.clientX : e.clientY);

      let newWidth = this.calculatePercentage(offset, this.percentageDiff);
      let diff = parseFloat(this.firstElement.style[property]) - newWidth;

      const newFirstElementSize = parseFloat(this.firstElement.style[property]) - diff;
      const newSecondElementSize = parseFloat(this.secondElement.style[property]) + diff;

      if (Math.min(newFirstElementSize, newSecondElementSize) > this.minPersentage) {
        this.firstElement.style[property] = newFirstElementSize + '%';
        this.secondElement.style[property] = newSecondElementSize + '%';

        window.dispatchEvent(new Event('resize'));
      }
  }

  private calculatePercentage(offset: number = 0, percentageDiff: number = 1) {
    if (percentageDiff === 0) percentageDiff = 1;

    const property = this.capitalizeFirstLetter(this.property);
    const parentSize = this.firstElement.parentElement[`client${property}`];
    const calculatedPercentage = (this.firstElement[`client${property}`] - offset) / parentSize * 100 * percentageDiff;

    return calculatedPercentage;
  }

  private getMinPercentage() {
    const parentSize = this.firstElement.parentElement[`client${this.capitalizeFirstLetter(this.property)}`];
    const calculatedPercentage = this.resizerMin / parentSize * 100 * this.percentageDiff;
    return calculatedPercentage;
  }

  private capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
