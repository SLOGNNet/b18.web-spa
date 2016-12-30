import { Directive, ElementRef, Input } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[sticky]'
})
export class StickyDirective {
  @Input() top = true;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewChecked() {
    this.update();
  }

  private update() {
    const parentWidth =  this._getParentWidth();
    let updatedTop: string = '';

    if (this.elementRef.nativeElement.clientWidth !== parentWidth) {
      this.elementRef.nativeElement.style.width = parentWidth + 'px';
    }

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
