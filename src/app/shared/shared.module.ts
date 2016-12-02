import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './notification.service';
import { SocketService } from './socket.service';
import { CustomerService } from './customer.service';
import { EnumHelperService } from './helpers';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from '../common/typeahead/typeahead.module.ts';
import { BdTypeaheadComponent } from '../common/bd-typeahead';
import { BdDropdownComponent } from '../common/bd-dropdown';
import { BdFormButtonComponent } from '../common/bd-form-button';
import { BdTextareaAutosize } from '../common/bd-input/autosize.directive';
import { BdInputComponent } from '../common/bd-input';
import { BdSpinnerComponent } from '../common/bd-spinner';
import { BdLoadFormComponent } from '../forms/load-form';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';

@NgModule({
  providers: [
    NotificationService,
    SocketService,
    CustomerService,
    EnumHelperService
  ],
  declarations: [
    BdTypeaheadComponent,
    BdLoadFormComponent,
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
    BdTypeaheadComponent,
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdSpinnerComponent,
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
