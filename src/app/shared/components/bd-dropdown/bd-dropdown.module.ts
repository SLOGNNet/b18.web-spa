import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BdDropdownComponent } from './bd-dropdown.component';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BdDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  exports: [
    BdDropdownComponent,
    DropdownModule
  ],
})
export class BdDropdownModule {
}
