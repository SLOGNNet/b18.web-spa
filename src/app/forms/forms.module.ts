import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
import { AddressForm } from './address-form';
import { AddressesForm } from './addresses-form';
import { SharedModule } from '../shared/shared.module';

import { BdLoadFormComponent } from './load-form';

@NgModule({
  declarations: [
    CustomerForm,
    AddressForm,
    AddressesForm,
    BdLoadFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerForm,
    AddressForm,
    BdLoadFormComponent
  ]
})
export class BdFormsModule {
}
