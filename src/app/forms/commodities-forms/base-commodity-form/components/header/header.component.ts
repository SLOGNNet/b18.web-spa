import { Component, Input } from '@angular/core';

@Component({
  selector: 'commodities-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class CommoditiesHeaderComponent  {
  @Input() focusedColumnIndex: number = null;
  @Input() titles: Array<string> = new Array<string>();
  @Input() private size: 'default' | 'small' = 'default';
}
