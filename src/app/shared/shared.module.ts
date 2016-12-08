import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NotificationService, CustomerService, SocketService, LoadService } from './services';
import { EnumHelperService } from './helpers';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from './components/typeahead/typeahead.module.ts';
import { BdDropdownComponent } from './components/bd-dropdown';
import { BdFormButtonComponent } from './components/bd-form-button';
import { BdButtonSwitchComponent } from './components/bd-button-switch';
import { BdFormSwitchComponent } from './components/bd-form-switch';
import { BdTextareaAutosize } from './components/bd-input/autosize.directive';
import { BdInputComponent } from './components/bd-input';
import { BdButtonComponent } from './components/bd-button';
import { BdSpinnerComponent } from './components/bd-spinner';
import { ViewModeToogleComponent } from './components/view-mode-toogle';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { BdFormSectionComponent } from './components/bd-form-section';
import { BdFormTypeaheadComponent } from './components/bd-form-typeahead';
import { BdFormBuilder, BdFormGroup, BdFormControl } from './forms';
@NgModule({
  providers: [
    NotificationService,
    LoadService,
    SocketService,
    CustomerService,
    EnumHelperService,
    BdFormBuilder
  ],
  declarations: [
    BdFormButtonComponent,
    BdDropdownComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdSpinnerComponent,
    BdFormTypeaheadComponent,
    ViewModeToogleComponent,
    BdButtonComponent,
    BdFormSectionComponent,
    BdButtonSwitchComponent,
    BdFormSwitchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
    DropdownModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdSpinnerComponent,
    BdDropdownComponent,
    BdFormTypeaheadComponent,
    BdFormSectionComponent,
    BdButtonSwitchComponent,
    BdFormSwitchComponent,
    TypeaheadModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ViewModeToogleComponent,
    BdButtonComponent,
    HttpModule
  ]

})
export class SharedModule { }
