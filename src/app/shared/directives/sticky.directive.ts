import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[sticky]'
})
export class StickyDirective {
  private _initialTop: number = 0;

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    const scrollableContainer = this._getScrollableParent(this.elementRef.nativeElement.parentNode);

    if (scrollableContainer) {
      scrollableContainer.addEventListener('scroll', this._onScrollChanged.bind(this));
      this.elementRef.nativeElement.style.top = `${scrollableContainer.scrollTop + this._initialTop}px`;
    }
  }

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    const scrollableContainer = this._getScrollableParent(this.elementRef.nativeElement.parentNode);
    this._initialTop = this.elementRef.nativeElement.offsetTop;

    if (scrollableContainer) {
      scrollableContainer.addEventListener('scroll', this._onScrollChanged.bind(this));
    }
  }

  private _onScrollChanged(e) {
    const scrollTop = e.target.scrollTop;

    this.elementRef.nativeElement.style.top = `${scrollTop + this._initialTop}px`;
  }

  private _getScrollableParent(node) {
    if (node === null) {
      return null;
    }

    if (node.clientHeight > 0 && node.scrollHeight > node.clientHeight) {
      return node;
    } else {
      return this._getScrollableParent(node.parentNode);
    }
  }
}
