import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
import { AddressForm } from './address-form';
import { SharedModule } from '../shared/shared.module';

import { BdLoadFormComponent } from './load-form';
import { CommodityComponent } from './commodity-form/components/commodity/commodity.component';
import { CommodityFormComponent } from './commodity-form/commodity-form.component';

@NgModule({
  declarations: [
    CustomerForm,
    AddressForm,
    BdLoadFormComponent,
    CommodityComponent,
    CommodityFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerForm,
    AddressForm,
    BdLoadFormComponent,
    CommodityComponent,
    CommodityFormComponent
  ]
})
export class BdFormsModule {
}
