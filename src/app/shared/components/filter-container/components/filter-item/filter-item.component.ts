import { Component, Input, Output, EventEmitter, OnChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'filter-item',
  styleUrls: ['./filter-item.component.scss'],
  templateUrl: './filter-item.component.html'
})
export class FilterItem  {
  @Input() itemTemplate: TemplateRef<any>;
  @Input() item: Object;
  @Output() itemClick = new EventEmitter();


  onClick(event) {
    this.itemClick.emit(event);
  }
}
