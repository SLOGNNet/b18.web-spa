import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { MainRoutingModule } from './main.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BdFormsModule } from '../forms/forms.module';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';

// Components
import { MainComponent } from './main.component';
import { CompaniesComponent, CompanyEditComponent } from '../companies';
import { CompanyCardComponent } from '../companies/components/company-card';
import { CompanyDetailComponent } from '../companies/components/company-detail';
import { CompanyCardsComponent } from '../companies/components/company-cards';
import { BdToastManagerComponent } from '../bd-toast-manager/bd-toast-manager.component';
import { EquipmentComponent, EquipmentCardComponent, EquipmentCardsComponent } from '../equipment';
import { TopPanelComponent } from '../top-panel';
import { MultiPaneLayoutComponent } from '../multi-pane-layout';
import { DriversModule } from '../drivers';
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
    DriversModule
  ],
  declarations: [
    MainComponent,
    TopPanelComponent,
    HomeComponent,
    MessagesComponent,
    MessageComponent,
    LoadsComponent,
    LoadEditComponent,
    CompaniesComponent,
    CompanyEditComponent,
    CompanyDetailComponent,
    CompanyCardComponent,
    CompanyCardsComponent,
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
    BdToastManagerComponent,
    EquipmentComponent,
    EquipmentCardComponent,
    EquipmentCardsComponent
  ],
  exports: [
    BdFormsModule
  ]
})
export class MainModule { }
