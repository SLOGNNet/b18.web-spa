import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

import {
  DriverEditComponent,
  DriverCardsComponent,
  DriverCardComponent,
  DriverDetailComponent,
  DriverLicenseComponent,
  DriverInformationComponent,
  DriverPaymentTypeComponent,
  DriverEquipmentAssociationsComponent } from './components';
import { DriversComponent } from './drivers.component';
import { DriverRoutingModule } from './drivers.routing';
import { BdFormsModule } from '../forms/forms.module';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    DriverRoutingModule,
    SharedModule,
    BdFormsModule
  ],
  declarations: [
    DriverEditComponent,
    DriversComponent,
    DriverCardComponent,
    DriverCardsComponent,
    DriverDetailComponent,
    DriverEquipmentAssociationsComponent,
    DriverInformationComponent,
    DriverLicenseComponent,
    DriverPaymentTypeComponent
  ]
})
export class DriversModule { }
