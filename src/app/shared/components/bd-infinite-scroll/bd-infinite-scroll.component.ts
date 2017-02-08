import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-infinite-scroll',
  templateUrl: './bd-infinite-scroll.component.html',
  styleUrls: ['./bd-infinite-scroll.component.scss']
})
export class BdInfiniteScrollComponent {
  @Output() scrolledDown: EventEmitter<any> = new EventEmitter();

  onScrolledDown(e) {
    this.scrolledDown.emit();
  }

}
