import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavigationBarComponent } from './navigation-bar.component';
import { MenuItemComponent } from './components';
import { RouterModule } from '@angular/router';
import { LayoutSwitchComponent } from '../layout-switch';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    MenuItemComponent,
    NavigationBarComponent
  ],
  exports: [
    MenuItemComponent,
    NavigationBarComponent
  ]
})
export class NavigationBarModule { }
