import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-item',
  template: `
      <div class="menu-item" [hidden]="menuItem.hidden" [routerLinkActive]="['active']">
          <div *ngIf="menuItem.icon" [ngClass]="['menu-icon', menuItem.icon]"></div>
          <a *ngIf="!menuItem.link">{{menuItem.label}}</a>
          <a *ngIf="menuItem.link" [routerLink]="[menuItem.link]">{{menuItem.label}}</a>
          
        <div *ngIf="menuItem.items" class="sub-menu">
          <div class="sub-menu-item" [hidden]="subMenu.hidden" [routerLinkActive]="['active']" *ngFor="let subMenu of menuItem.items">
            <a *ngIf="!subMenu.link">{{subMenu.label}}</a>
            <a *ngIf="subMenu.link" [routerLink]="[subMenu.link]">{{subMenu.label}}</a>
          </div>
        </div>
      </div>
    `,
  styleUrls: [
    './menu-item.component.scss'
  ]
})

export class MenuItemComponent {
  @Input() menuItem;
}
