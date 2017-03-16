import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavigationBarComponent } from './navigation-bar.component';
import { MenuItemComponent, LayoutSwitchComponent } from './components';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    LayoutSwitchComponent,
    MenuItemComponent,
    NavigationBarComponent
  ],
  exports: [
    MenuItemComponent,
    NavigationBarComponent
  ]
})
export class NavigationBarModule { }
