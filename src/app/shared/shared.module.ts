import { NgModule, ModuleWithProviders } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NotificationService,
  CustomerService,
  SocketService,
  LoadService,
  GoogleService,
  CommodityService,
  ContactService,
  FormValidationService,
  FileUploadService,
} from './services';
import { EnumHelperService } from './helpers';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from './components/typeahead/typeahead.module.ts';
import { BdButtonSwitchComponent } from './components/bd-button-switch';
import { BdFormSwitchComponent } from './components/bd-form-switch';
import { BdTextareaAutosize } from './components/bd-input/autosize.directive';
import { BdInputComponent } from './components/bd-input';
import { BdUploadFileComponent } from './components/bd-upload-file';
import { BdFilePreviewComponent } from './components/bd-file-preview';
import { AddressItemTemplate } from './components/templates/address-item';
import { BdSpinnerComponent } from './components/bd-spinner';
import { BdFormExpandComponent } from './components/bd-form-expand';
import { GoogleMapComponent } from './components/google-map';
import { FormNavigationComponent, NavigationAnchorComponent } from './components/form-navigation';
import { BdFormSectionComponent } from './components/bd-form-section';
import { BdFormTypeaheadComponent } from './components/bd-form-typeahead';
import { BdValidatorComponent } from './components/bd-validator';
import { BdFormBuilder, BdFormGroup, BdFormControl } from './forms';
import { BdDropdownModule } from './components/bd-dropdown';
import { NgbDatepickerModule } from './components/datepicker';
import { BdRemoveButtonComponent,
  BdAddButtonComponent,
  BdButtonComponent,
  BdFormButtonComponent
} from './components/bd-buttons';
import { BdFormDatePicker, BdDatePicker } from './components/bd-form-datepicker';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { StickyDirective, BlurForwarderDirective, ClickOutsideDirective } from './directives';
import { BdPopoverModule } from './directives/bd-popover/index';
import { FormStickyBottomContainerComponent } from './components/form-sticky-bottom-container';
import { StopsLineComponent, StopPopoverComponent } from './components/stops-line';
import { BdResizerComponent, BdResizeContainerComponent } from './components/bd-resizer';

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
    FormValidationService,
    DatePipe
  ],
  declarations: [
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdUploadFileComponent,
    BdFilePreviewComponent,
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
    NavigationAnchorComponent,
    AddressItemTemplate,
    StickyDirective,
    BlurForwarderDirective,
    ClickOutsideDirective,
    FormStickyBottomContainerComponent,
    BdFormDatePicker,
    BdDatePicker,
    StopsLineComponent,
    StopPopoverComponent,
    BdResizerComponent,
    BdResizeContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
    ReactiveFormsModule,
    HttpModule,
    PerfectScrollbarModule,
    NgbDatepickerModule.forRoot(),
    BdDropdownModule,
    BdPopoverModule
  ],
  exports: [
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdUploadFileComponent,
    BdFilePreviewComponent,
    BdSpinnerComponent,
    GoogleMapComponent,
    BdFormTypeaheadComponent,
    BdFormSectionComponent,
    BdButtonSwitchComponent,
    BdFormSwitchComponent,
    BdValidatorComponent,
    TypeaheadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BdFormExpandComponent,
    BdButtonComponent,
    BdRemoveButtonComponent,
    BdAddButtonComponent,
    BdFormDatePicker,
    FormNavigationComponent,
    NavigationAnchorComponent,
    StickyDirective,
    BlurForwarderDirective,
    ClickOutsideDirective,
    FormStickyBottomContainerComponent,
    AddressItemTemplate,
    BdDropdownModule,
    NgbDatepickerModule,
    StopsLineComponent,
    StopPopoverComponent,
    HttpModule,
    BdPopoverModule,
    BdResizerComponent,
    BdResizeContainerComponent
  ]
})
export class SharedModule {

}
