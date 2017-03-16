import { Directive, ElementRef, Input, HostListener, ChangeDetectorRef } from '@angular/core';
import { getScrollbarWidth } from '../helpers';

@Directive({
  selector: '[sticky]'
})
export class StickyDirective {
  @Input() top = true;
  @Input() stickyPositionInsideScroll: boolean = false;

  private scrollbarWidth;
  private isParentScrollable = false;
  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    if (this.stickyPositionInsideScroll) {
      this.scrollbarWidth = getScrollbarWidth();
    }
  }

  ngAfterViewChecked() {
    this.update();
  }

  @HostListener('window:resize')
  private update() {
    if (this.stickyPositionInsideScroll) {
      this._updateWidth();
    }

    this._updateTop();
  }

  private _updateWidth() {
    const scrollableContainer = this._getScrollableParent(this.elementRef.nativeElement.parentNode);

    if (!!scrollableContainer !== this.isParentScrollable) {
      this.isParentScrollable = !!scrollableContainer;
      if (this.isParentScrollable) {
        this.elementRef.nativeElement.style.width = `calc(100% - ${this.scrollbarWidth}px)`;
      } else {
        this.elementRef.nativeElement.style.width = '100%';
      }
    }
  }

  private _updateTop() {
    let updatedTop: string = '';

    if (!this.top) {
      const scrollableContainer = this._getScrollableParent(this.elementRef.nativeElement.parentNode);

      if (scrollableContainer) {
        updatedTop = scrollableContainer.clientHeight - this.elementRef.nativeElement.clientHeight + 'px';
      }
    }

    this.elementRef.nativeElement.style.top = updatedTop;
  }

  private _getParentWidth() {
    return this.elementRef.nativeElement.parentNode.clientWidth;
  }

  private _getScrollableParent(node) {
    if (node === null || node.nodeName === 'BODY' || node.nodeName === 'APP-MAIN') {
      return null;
    }

    if (node.clientHeight > 0 && node.scrollHeight > node.clientHeight) {
      return node;
    } else {
      return this._getScrollableParent(node.parentNode);
    }
  }
}
