import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'bd-perfect-scrollbar',
  templateUrl: './bd-perfect-scrollbar.component.html',
  styleUrls: ['./bd-perfect-scrollbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BdPerfectScrollbarComponent {
  private config = {
    suppressScrollY: true,
    useBothWheelAxes: true
  };

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._cdr.markForCheck();
    }, 0);
  }
}
