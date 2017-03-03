import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { MainRoutingModule } from './main.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BdFormsModule } from '../forms/forms.module';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';

// Components
import { MainComponent } from './main.component';
import { CompaniesComponent, CompanyDetailComponent } from '../companies';
import { CompanyCardComponent } from '../companies/components/company-card';
import { CompanyCardsComponent } from '../companies/components/company-cards';
import { BdToastManagerComponent } from '../bd-toast-manager/bd-toast-manager.component';
import { EquipmentComponent, EquipmentCardComponent, EquipmentCardsComponent } from '../equipment';
import { TopPanelComponent } from '../top-panel';
import { DriversComponent, DriverCardsComponent, DriverCardComponent } from '../drivers';
import { MultiPaneLayoutComponent } from '../multi-pane-layout';
import { HomeComponent } from '../home';
import { MessagesComponent } from '../drivers/messages';
import { MessageComponent } from '../drivers/messages/message';
import {
  LoadsComponent,
  LoadDetailComponent,
  LoadStopCardComponent,
  LoadStopCardsComponent,
  TripPopoverComponent,
  CompanyPopoverComponent,
  DriverPopoverComponent,
  LoadViewModeCardComponent
} from '../loads';


@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    RouterModule,
    SharedModule,
    BdFormsModule,
    NavigationBarModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    TopPanelComponent,
    MultiPaneLayoutComponent,
    HomeComponent,
    DriversComponent,
    DriverCardsComponent,
    DriverCardComponent,
    MessagesComponent,
    MessageComponent,
    LoadsComponent,
    LoadDetailComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyCardComponent,
    CompanyCardsComponent,
    LoadStopCardComponent,
    LoadStopCardsComponent,
    LoadViewModeCardComponent,
    TripPopoverComponent,
    CompanyPopoverComponent,
    DriverPopoverComponent,
    BdToastManagerComponent,
    EquipmentComponent,
    EquipmentCardComponent,
    EquipmentCardsComponent
  ],
  exports: [
  ]
})
export class MainModule { }
