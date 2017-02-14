import { Component, Input, Output, EventEmitter, OnChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'filter-item',
  styleUrls: ['./filter-item.component.scss'],
  templateUrl: './filter-item.component.html'
})
export class FilterItem {
  @Input() itemTemplate: TemplateRef<any>;
  @Input() item: Object;
  @Input() checked: boolean = false;
  @Output() checkedChange: EventEmitter<any> = new EventEmitter();

  onCheckedChange(checked) {
    this.checked = checked;
    this.checkedChange.emit(this.item);
  }
}
