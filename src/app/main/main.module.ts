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
import { CompaniesModule } from '../companies';
import { HomeComponent } from '../home';
import { MessagesComponent } from '../drivers/messages';
import { MessageComponent } from '../drivers/messages/message';

import {
  LoadsComponent,
  LoadEditComponent,
  LoadStopCardComponent,
  LoadStopCardsComponent,
  TripPopoverComponent,
  CompanyPopoverComponent,
  DriverPopoverComponent,
  LoadDetailComponent,
  CommodityDetailsComponent,
  TripViewComponent,
  StopViewComponent,
  CustomerDetailComponent,
  RequirementsDetailComponent
} from '../loads';


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
    EquipmentModule
  ],
  declarations: [
    MainComponent,
    TopPanelComponent,
    HomeComponent,
    MessagesComponent,
    MessageComponent,
    LoadsComponent,
    LoadEditComponent,
    LoadStopCardComponent,
    LoadStopCardsComponent,
    LoadDetailComponent,
    TripViewComponent,
    StopViewComponent,
    CustomerDetailComponent,
    RequirementsDetailComponent,
    TripPopoverComponent,
    CompanyPopoverComponent,
    DriverPopoverComponent,
    CommodityDetailsComponent,
    BdToastManagerComponent
  ],
  exports: [
    BdFormsModule
  ]
})
export class MainModule { }
