import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BdDropdownComponent } from './bd-dropdown.component';
import { BsDropdownModule  } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BdDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    BdDropdownComponent,
    BsDropdownModule
  ],
})
export class BdDropdownModule {
}
