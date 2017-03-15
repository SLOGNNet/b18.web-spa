import { Component, Input, AfterViewInit, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'form-sticky-bottom-container',
  templateUrl: './form-sticky-bottom-container.component.html',
  styleUrls: ['./form-sticky-bottom-container.component.scss']
})
export class FormStickyBottomContainerComponent implements AfterViewInit {
  public timout = null;
  public height: string;
  @Input() sticky = true;

  ngAfterViewInit() {
    this.timout = setTimeout(() => this.update(), 0);
  }

  ngOnDestroy() {
    clearTimeout(this.timout);
  }

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
  }

  @HostListener('window:resize')
  private update() {
    if (this.sticky) {
      const newHeight = this.elementRef.nativeElement.firstChild.clientHeight;
      this._updateHeight(newHeight);
    } else {
      this._updateHeight('');
    }
  }

  private _updateHeight(height: string) {
    if (this.height !== height) {
      this.height = height;
      this.elementRef.nativeElement.style.height = height + 'px';
      this.cdr.detectChanges();
    }
  }
}
