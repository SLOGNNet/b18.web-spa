import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: [
    './menu-item.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuItemComponent {
  @Input() menuItem;
}
