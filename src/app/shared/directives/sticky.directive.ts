import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[sticky]'
})
export class StickyDirective {
  @Input() top = true;
  @Input() scrollable = true;
  private scrollableContainer = null;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewChecked() {
    this.update();
  }

  @HostListener('window:resize')
  private update() {
    this.scrollableContainer = this._getScrollableParent(this.elementRef.nativeElement.parentNode);
    const parentWidth =  this._getParentWidth();

    this.elementRef.nativeElement.style.position = this.scrollable ? 'absolute' : '';

    if (this.elementRef.nativeElement.clientWidth !== parentWidth) {
      this.elementRef.nativeElement.style.width = parentWidth + 'px';
    }

    if (this.scrollableContainer && !this.top) {
      this.elementRef.nativeElement.style.top = this.scrollableContainer.clientHeight - this.elementRef.nativeElement.clientHeight + 'px';
    } else {
      this.elementRef.nativeElement.style.top = '';
    }
  }

  private _getParentWidth() {
    return this.elementRef.nativeElement.parentNode.clientWidth;
  }

  private _getScrollableParent(node) {
    if (node === null || node.nodeName === 'BODY') {
      return null;
    }

    if (node.clientHeight > 0 && node.scrollHeight > node.clientHeight) {
      return node;
    } else {
      return this._getScrollableParent(node.parentNode);
    }
  }
}
