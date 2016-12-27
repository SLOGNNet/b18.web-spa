import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
import { AddressForm } from './address-form';
import { AddressesForm } from './addresses-form';
import { DropoffFormComponent } from './dropoff-form';
import { DropoffsFormComponent } from './dropoffs-form';
import { PickupFormComponent } from './pickup-form';
import { PickupsFormComponent } from './pickups-form';
import { SharedModule } from '../shared/shared.module';

import { BdLoadFormComponent } from './load-form';
import { CommodityComponent, BaseCommodityFormComponent, PickUpCommodityFormComponent, DropOffCommodityFormComponent } from './commodities-forms';

@NgModule({
  declarations: [
    CustomerForm,
    AddressForm,
    AddressesForm,
    BdLoadFormComponent,
    CommodityComponent,
    BaseCommodityFormComponent,
    DropoffFormComponent,
    DropoffsFormComponent,
    PickupFormComponent,
    PickupsFormComponent,
    PickUpCommodityFormComponent,
    DropOffCommodityFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerForm,
    BdLoadFormComponent,
  ]
})
export class BdFormsModule {
}
