import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
import { AddressForm } from './address-form';
import { AddressesForm } from './addresses-form';
import { SharedModule } from '../shared/shared.module';

import { BdLoadFormComponent } from './load-form';
import { CommodityComponent, BaseCommodityFormComponent, PickUpCommodityFormComponent } from './commodities-forms';

@NgModule({
  declarations: [
    CustomerForm,
    AddressForm,
    AddressesForm,
    BdLoadFormComponent,
    CommodityComponent,
    BaseCommodityFormComponent,
    PickUpCommodityFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerForm,
    AddressForm,
    BdLoadFormComponent,
    CommodityComponent,
    BaseCommodityFormComponent,
    PickUpCommodityFormComponent
  ]
})
export class BdFormsModule {
}
