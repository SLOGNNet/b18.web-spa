import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BdDropdownComponent } from './bd-dropdown.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BdDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule.forRoot()
  ],
  exports: [
    BdDropdownComponent,
    DropdownModule
  ],
})
export class BdDropdownModule {
}
