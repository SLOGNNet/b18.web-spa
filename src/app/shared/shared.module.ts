import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NotificationService,
  CustomerService,
  SocketService,
  LoadService,
  GoogleService,
  CommodityService,
  ContactService,
  FormValidationService
} from './services';
import { EnumHelperService } from './helpers';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from './components/typeahead/typeahead.module.ts';
import { BdDropdownComponent } from './components/bd-dropdown';
import { BdButtonSwitchComponent } from './components/bd-button-switch';
import { BdFormSwitchComponent } from './components/bd-form-switch';
import { BdTextareaAutosize } from './components/bd-input/autosize.directive';
import { BdInputComponent } from './components/bd-input';
import { BdSpinnerComponent } from './components/bd-spinner';
import { BdFormExpandComponent } from './components/bd-form-expand';
import { GoogleMapComponent } from './components/google-map';
import { FormNavigationComponent, NavigationAnchorComponent } from './components/form-navigation';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { BdFormSectionComponent } from './components/bd-form-section';
import { BdFormTypeaheadComponent } from './components/bd-form-typeahead';
import { BdValidatorComponent } from './components/bd-validator';
import { BdFormBuilder, BdFormGroup, BdFormControl } from './forms';
import { BdRemoveButtonComponent,
  BdAddButtonComponent,
  BdButtonComponent,
  BdFormButtonComponent
} from './components/bd-buttons';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';

@NgModule({
  providers: [
    NotificationService,
    LoadService,
    SocketService,
    CustomerService,
    ContactService,
    EnumHelperService,
    GoogleService,
    CommodityService,
    BdFormBuilder,
    FormValidationService
  ],
  declarations: [
    BdFormButtonComponent,
    BdDropdownComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdSpinnerComponent,
    BdFormTypeaheadComponent,
    BdFormExpandComponent,
    BdButtonComponent,
    BdRemoveButtonComponent,
    BdAddButtonComponent,
    BdFormSectionComponent,
    BdButtonSwitchComponent,
    BdFormSwitchComponent,
    BdValidatorComponent,
    GoogleMapComponent,
    FormNavigationComponent,
    NavigationAnchorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
    DropdownModule,
    ReactiveFormsModule,
    HttpModule,
    PerfectScrollbarModule
  ],
  exports: [
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdSpinnerComponent,
    GoogleMapComponent,
    BdDropdownComponent,
    BdFormTypeaheadComponent,
    BdFormSectionComponent,
    BdButtonSwitchComponent,
    BdFormSwitchComponent,
    BdValidatorComponent,
    TypeaheadModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BdFormExpandComponent,
    BdButtonComponent,
    BdRemoveButtonComponent,
    BdAddButtonComponent,
    FormNavigationComponent,
    NavigationAnchorComponent,
    HttpModule
  ]

})
export class SharedModule { }
