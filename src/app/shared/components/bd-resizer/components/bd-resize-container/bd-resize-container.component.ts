import { Component, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bd-resize-container',
  templateUrl: './bd-resize-container.component.html',
  styleUrls: ['./bd-resize-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdResizeContainerComponent {
  @Input() width: number = 0;

  constructor(public element: ElementRef) {
  }

  ngOnChanges(changes) {
    if (changes.width) {
      console.log('ngOnChanges', this.width);
      this.element.nativeElement.style.width = this.width + '%';
    }
  }

  public getWidth() {
    return this.element.nativeElement.style.width;
  }
}
