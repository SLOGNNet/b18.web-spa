import { Component, Input, Output, EventEmitter, OnChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'filter-item',
  styleUrls: ['./filter-item.component.scss'],
  templateUrl: './filter-item.component.html'
})
export class FilterItem {
  @Input() itemTemplate: TemplateRef<any>;
  @Input() item: Object;
  @Input() selected: boolean = false;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  onCheckedChange(checked) {
    this.selected = checked;
    this.selectedChange.emit(this.item);
  }

  onItemClick() {
    this.itemClick.emit(this.item);
  }
}
