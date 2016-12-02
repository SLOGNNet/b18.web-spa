import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
import { AddressForm } from './address-form'
import { SharedModule } from '../shared/shared.module';
import { BdFormTypeaheadComponent } from '../common/bd-form-typeahead';
import { BdLoadFormComponent } from './load-form';

@NgModule({
  declarations: [
    CustomerForm,
    AddressForm
    BdFormTypeaheadComponent,
    BdLoadFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerForm,
    AddressForm
    BdFormTypeaheadComponent,
    BdLoadFormComponent
  ]
})
export class BdFormsModule {
}
