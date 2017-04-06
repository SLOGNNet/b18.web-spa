import { NgModule } from '@angular/core';
import { BdValidatorComponent, BdValidatiorMessageComponent, BdValidatorSummaryComponent } from './components';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BdValidatorComponent,
    BdValidatiorMessageComponent,
    BdValidatorSummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    BdValidatorComponent,
    BdValidatiorMessageComponent,
    BdValidatorSummaryComponent
  ]
})
export class BdValidatorModule {
}
