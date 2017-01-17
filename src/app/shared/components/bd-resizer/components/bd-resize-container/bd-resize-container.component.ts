import { Component, ElementRef , ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bd-resize-container',
  templateUrl: './bd-resize-container.component.html',
  styleUrls: ['./bd-resize-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdResizeContainerComponent {
    constructor(public element: ElementRef) {
      this.element.nativeElement.style.width = 33.3 + '%';
    }
}
