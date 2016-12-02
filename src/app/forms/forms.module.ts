import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
import { SharedModule } from '../shared/shared.module';
import { BdFormTypeaheadComponent } from '../common/bd-form-typeahead';
import { BdLoadFormComponent } from './load-form';

@NgModule({
  declarations: [
    CustomerForm,
    BdFormTypeaheadComponent,
    BdLoadFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerForm,
    BdFormTypeaheadComponent,
    BdLoadFormComponent
  ]
})
export class BdFormsModule {
}
