import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

import {
    EquipmentCardComponent,
    EquipmentCardsComponent,
    EquipmentDetailComponent,
    EquipmentEmploymentComponent,
    EquipmentDetailsComponent,
    EquipmentAssignmentComponent,
    EquipmentEditComponent } from './components';
import { EquipmentComponent } from './equipment.component';
import { EquipmentRoutingModule } from './equipment.routing';
import { BdFormsModule } from '../forms/forms.module';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    EquipmentRoutingModule,
    SharedModule,
    BdFormsModule
  ],
  declarations: [
    EquipmentComponent,
    EquipmentCardComponent,
    EquipmentCardsComponent,
    EquipmentDetailComponent,
    EquipmentEmploymentComponent,
    EquipmentDetailsComponent,
    EquipmentAssignmentComponent,
    EquipmentEditComponent
  ]
})
export class EquipmentModule { }
