import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'bd-perfect-scrollbar',
  templateUrl: './bd-perfect-scrollbar.component.html',
  styleUrls: ['./bd-perfect-scrollbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BdPerfectScrollbarComponent {

  @Input() items: Array<Object>;

  @Output() itemClick: EventEmitter<any> = new EventEmitter();
  private _activeItem: number = 0;

  onItemClick(id, index): void {
    this._activeItem = index;

    this.itemClick.emit({
      id: id,
      index: index
    });
  }

}
