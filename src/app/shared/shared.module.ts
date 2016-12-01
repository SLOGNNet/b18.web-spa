import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './notification.service';
import { SocketService } from './socket.service';
import { CommonModule } from '@angular/common';

import { TypeaheadModule } from '../common/typeahead/typeahead.module.ts';
import { BdTypeaheadComponent } from '../common/bd-typeahead';
import { BdDropdownComponent } from '../common/bd-dropdown';
import { BdFormButtonComponent } from '../common/bd-form-button';
import { BdTextareaAutosize } from '../common/bd-input/autosize.directive';
import { BdInputComponent } from '../common/bd-input';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';

@NgModule({
  providers: [
    NotificationService,
    SocketService
  ],
  declarations: [
    BdTypeaheadComponent,
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
    TypeaheadModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
