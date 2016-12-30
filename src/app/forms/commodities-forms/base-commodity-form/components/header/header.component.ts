import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'commodities-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class CommoditiesHeaderComponent  {
  @Input() fucsedColumnIndex: number = null;
  @Input() titles: Array<string> = new Array<string>();
}
