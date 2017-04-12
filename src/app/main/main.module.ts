import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { MainRoutingModule } from './main.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BdFormsModule } from '../forms/forms.module';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';

// Components
import { MainComponent } from './main.component';
import { BdToastManagerComponent } from '../bd-toast-manager/bd-toast-manager.component';
import { EquipmentModule } from '../equipment';
import { TopPanelComponent } from '../top-panel';
import { DriversModule } from '../drivers';
import { LoadsModule } from '../loads';
import { CompaniesModule } from '../companies';
import { HomeComponent } from '../home';
import { MessagesComponent } from '../drivers/messages';
import { MessageComponent } from '../drivers/messages/message';


@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    RouterModule,
    SharedModule,
    BdFormsModule,
    NavigationBarModule,
    MainRoutingModule,
    DriversModule,
    CompaniesModule,
    EquipmentModule,
    LoadsModule
  ],
  declarations: [
    MainComponent,
    TopPanelComponent,
    HomeComponent,
    MessagesComponent,
    MessageComponent,
    BdToastManagerComponent
  ],
  exports: [
    BdFormsModule
  ]
})
export class MainModule { }
