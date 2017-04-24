import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

import {
  LoadStopCardComponent,
  LoadStopCardsComponent,
  TripPopoverComponent,
  StopActionsComponent,
  CompanyPopoverComponent,
  DriverPopoverComponent,
  LoadDetailComponent,
  CommodityDetailsComponent,
  TripViewComponent,
  StopViewComponent,
  LoadEditStopComponent,
  CustomerDetailComponent,
  RequirementsDetailComponent,
  LoadEditInfoComponent,
  LoadEditCustomerComponent,
  LoadViewComponent,
  AppointmentRangeComponent,
  AppointmentTypeComponent,
  StopDetailViewComponent
} from './components';

import { LoadsComponent } from './loads.component';
import { LoadRoutingModule } from './loads.routing';
import { BdFormsModule } from '../forms/forms.module';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    LoadRoutingModule,
    SharedModule,
    BdFormsModule
  ],
  declarations: [
    LoadsComponent,
    LoadEditInfoComponent,
    LoadEditCustomerComponent,
    LoadStopCardComponent,
    LoadStopCardsComponent,
    TripPopoverComponent,
    CompanyPopoverComponent,
    DriverPopoverComponent,
    LoadDetailComponent,
    CommodityDetailsComponent,
    TripViewComponent,
    StopViewComponent,
    LoadEditStopComponent,
    CustomerDetailComponent,
    RequirementsDetailComponent,
    LoadViewComponent,
    StopActionsComponent,
    AppointmentRangeComponent,
    AppointmentTypeComponent,
    StopDetailViewComponent
  ]
})
export class LoadsModule { }
