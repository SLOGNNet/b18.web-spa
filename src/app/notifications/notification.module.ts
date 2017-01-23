import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NotificationsPopoverComponent } from './components';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    NotificationsPopoverComponent
  ],
  exports: [
    NotificationsPopoverComponent
  ]
})
export class NotificationModule { }
