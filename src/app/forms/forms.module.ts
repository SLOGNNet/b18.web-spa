import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
import { AddressForm } from './address-form';
import { AddressesForm } from './addresses-form';
import { StopFormComponent } from './stop-form';
import { StopsFormComponent } from './stops-form';
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
    PickUpCommodityFormComponent,
    StopFormComponent,
    StopsFormComponent,
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
