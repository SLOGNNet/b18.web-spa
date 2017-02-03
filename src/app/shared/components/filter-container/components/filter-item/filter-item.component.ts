import { Component, Input, Output, EventEmitter, OnChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'filter-item',
  styleUrls: ['./filter-item.component.scss'],
  templateUrl: './filter-item.component.html'
})
export class FilterItem  {
  @Input() companyItemTemplate: TemplateRef<any>;
  @Input() statusItemTemplate: TemplateRef<any>;
  @Input() item: Object;



  ngOnInit() {
    console.log(this.item, 'this items inside filter');
  }
}
