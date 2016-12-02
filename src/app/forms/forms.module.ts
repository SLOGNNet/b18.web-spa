import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
import { AddressForm } from './address-form'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomerForm,
    AddressForm
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerForm,
    AddressForm
  ]
})
export class BdFormsModule {
}
