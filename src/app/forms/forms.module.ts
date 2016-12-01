import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomerForm
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerForm
  ]
})
export class BdFormsModule {
}
