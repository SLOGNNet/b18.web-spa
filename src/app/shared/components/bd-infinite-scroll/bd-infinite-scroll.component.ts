import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-infinite-scroll',
  templateUrl: './bd-infinite-scroll.component.html',
  styleUrls: ['./bd-infinite-scroll.component.scss']
})
export class BdInfiniteScrollComponent {
  @Output() scrolledUp: EventEmitter<any> = new EventEmitter();
  @Output() scrolledDown: EventEmitter<any> = new EventEmitter();

  onScrolledUp(e) {
    this.scrolledUp.emit();
  }

  onScrolledDown(e) {
    console.log('emmit');
    this.scrolledDown.emit();
  }

}
