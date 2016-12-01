import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './notification.service';
import { SocketService } from './socket.service';
import { CustomerService } from './customer.service';
import { CommonModule } from '@angular/common';

import { TypeaheadModule } from '../common/typeahead/typeahead.module.ts';
import { BdTypeaheadComponent } from '../common/bd-typeahead';
import { BdDropdownComponent } from '../common/bd-dropdown';
import { BdFormButtonComponent } from '../common/bd-form-button';
import { BdTextareaAutosize } from '../common/bd-input/autosize.directive';
import { BdInputComponent } from '../common/bd-input';
import { BdLoadFormComponent } from '../forms/load-form';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';

@NgModule({
  providers: [
    NotificationService,
    SocketService,
    CustomerService
  ],
  declarations: [
    BdTypeaheadComponent,
    BdLoadFormComponent,
    BdFormButtonComponent,
    BdDropdownComponent,
    BdTextareaAutosize,
    BdInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  exports: [
    BdTypeaheadComponent,
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdDropdownComponent,
    BdLoadFormComponent,
    TypeaheadModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class SharedModule { }
