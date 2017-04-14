import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

import {
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
  LoadEditStopComponent,
  CustomerDetailComponent,
  RequirementsDetailComponent,
  LoadEditInfoComponent,
  LoadEditCustomerComponent,
  LoadViewComponent
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
    LoadEditComponent,
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
    LoadViewComponent
  ]
})
export class LoadsModule { }
