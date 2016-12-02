import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './notification.service';
import { SocketService } from './socket.service';
import { CustomerService } from './customer.service';
import { EnumHelperService } from './helpers';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from '../common/typeahead/typeahead.module.ts';
import { BdDropdownComponent } from '../common/bd-dropdown';
import { BdFormButtonComponent } from '../common/bd-form-button';
import { BdTextareaAutosize } from '../common/bd-input/autosize.directive';
import { BdInputComponent } from '../common/bd-input';
import { BdSpinnerComponent } from '../common/bd-spinner';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';

@NgModule({
  providers: [
    NotificationService,
    SocketService,
    CustomerService,
    EnumHelperService
  ],
  declarations: [
    BdFormButtonComponent,
    BdDropdownComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  exports: [
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdSpinnerComponent,
    BdDropdownComponent,
    TypeaheadModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class SharedModule { }
