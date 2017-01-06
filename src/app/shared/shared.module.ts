import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { BdDropdownComponent } from './components/bd-dropdown';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from './components/typeahead/typeahead.module.ts';
import { BdButtonSwitchComponent } from './components/bd-button-switch';
import { BdFormSwitchComponent } from './components/bd-form-switch';
import { BdTextareaAutosize } from './components/bd-input/autosize.directive';
import { BdInputComponent } from './components/bd-input';
import { AddressItemTemplate } from './components/templates/address-item';
import { BdSpinnerComponent } from './components/bd-spinner';
import { BdFormExpandComponent } from './components/bd-form-expand';
import { GoogleMapComponent } from './components/google-map';
import { FormNavigationComponent, NavigationAnchorComponent } from './components/form-navigation';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { BdFormSectionComponent } from './components/bd-form-section';
import { BdFormTypeaheadComponent } from './components/bd-form-typeahead';
import { BdValidatorComponent } from './components/bd-validator';
import { BdFormBuilder, BdFormGroup, BdFormControl } from './forms';
import { NgbDatepicker, NgbDatepickerMonthView, NgbDatepickerNavigation,
  NgbDatepickerNavigationSelect, NgbDatepickerDayView,
  NgbInputDatepicker, NgbCalendar, NgbCalendarGregorian,
  NgbDatepickerI18n, NgbDatepickerI18nDefault, NgbDateParserFormatter,
  NgbDateISOParserFormatter, NgbDatepickerService, NgbDatepickerConfig } from './components/datepicker';
import { BdRemoveButtonComponent,
  BdAddButtonComponent,
  BdButtonComponent,
  BdFormButtonComponent
} from './components/bd-buttons';
import { BdFormDatePicker } from './components/bd-form-datepicker';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { StickyDirective } from './directives/sticky.directive';
import { FormStickyBottomContainerComponent } from './components/form-sticky-bottom-container';

@NgModule({
  declarations: [
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdDropdownComponent,
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
    NavigationAnchorComponent,
    AddressItemTemplate,
    StickyDirective,
    FormStickyBottomContainerComponent,
    BdFormDatePicker,
    NgbDatepicker,
    NgbDatepickerMonthView,
    NgbDatepickerNavigation,
    NgbDatepickerNavigationSelect,
    NgbDatepickerDayView,
    NgbInputDatepicker
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
    BdFormDatePicker,
    FormNavigationComponent,
    NavigationAnchorComponent,
    StickyDirective,
    FormStickyBottomContainerComponent,
    AddressItemTemplate,
    HttpModule,
    BdDropdownComponent,
    NgbDatepicker,
    NgbInputDatepicker
  ],
  entryComponents: [NgbDatepicker]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
     return {
       ngModule: SharedModule,
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
         {provide: NgbCalendar, useClass: NgbCalendarGregorian},
         {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nDefault},
         {provide: NgbDateParserFormatter, useClass: NgbDateISOParserFormatter}, NgbDatepickerService,
         NgbDatepickerConfig
       ]
     };
   }
}
