import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-perfect-scrollbar',
  templateUrl: './bd-perfect-scrollbar.component.html',
  styleUrls: ['./bd-perfect-scrollbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BdPerfectScrollbarComponent {
  private config = {
    suppressScrollY: true
  };
}
