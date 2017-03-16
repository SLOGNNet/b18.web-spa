import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

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

  onCheckedChange(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.checked = !this.checked;
    this.checkedChange.emit(this.item);
  }
}
