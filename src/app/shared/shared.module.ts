import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NotificationService,
  CompanyService,
  EquipmentService,
  DriverService,
  SocketService,
  LoadService,
  GoogleService,
  CommodityService,
  ContactService,
  FormValidationService,
  HttpService,
  StateService,
  LicenseService,
  LocationService,
  StopService
} from './services';
import { EnumHelperService } from './helpers';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from './components/typeahead/typeahead.module.ts';
import { BdButtonSwitchComponent } from './components/bd-button-switch';
import { BdCheckbox } from './components/bd-checkbox';
import { BdCheckboxes } from './components/bd-checkboxes';
import { BdFormCheckbox } from './components/bd-form-checkbox';
import { BdFormSwitchComponent } from './components/bd-form-switch';
import { BdTextareaAutosize } from './components/bd-input/autosize.directive';
import { BdInputComponent } from './components/bd-input';
import { BdUploadFileComponent } from './components/bd-upload-file';
import { BdFilePreviewComponent } from './components/bd-file-preview';
import { AddressItemTemplate } from './components/templates/address-item';
import { BdSpinnerComponent } from './components/bd-spinner';
import { BdFormSpinnerComponent } from './components/bd-form-spinner';
import { BdFormExpandComponent } from './components/bd-form-expand';
import { GoogleMapComponent } from './components/google-map';
import { FormNavigationComponent, NavigationAnchorComponent } from './components/form-navigation';
import { BdFormSectionComponent } from './components/bd-form-section';
import { BdFormTypeaheadComponent } from './components/bd-form-typeahead';
import { BdValidatorModule } from './components/bd-validator';
import { BdDropdownModule } from './components/bd-dropdown';
import { NgbDatepickerModule } from './components/datepicker';
import { EmptyComponent } from './components/empty';
import { MultiPaneLayoutComponent } from './components/multi-pane-layout';
import { BdRemoveButtonComponent,
  BdAddButtonComponent,
  BdButtonComponent,
  BdFormButtonComponent
} from './components/bd-buttons';
import { BdFormDateTimePicker } from './components/bd-form-datetimepicker';
import { BdFormDatePicker, BdDatePicker } from './components/bd-form-datepicker';
import { BdFormTimePicker } from './components/bd-form-timepicker';
import { TimePickerComponent } from './components/timepicker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { StickyDirective, BlurForwarderDirective, ClickOutsideDirective } from './directives';
import { BdPopoverModule } from './directives/bd-popover/index';
import { FormStickyBottomContainerComponent } from './components/form-sticky-bottom-container';
import { StopsLineComponent, StopPopoverComponent } from './components/stops-line';
import { BdResizerComponent, BdResizeContainerComponent } from './components/bd-resizer';
import { BdNotificationPopoverComponent } from './components/bd-notification-popover';
import { MessageCardComponent, TaskCardComponent, NotificationCardComponent, BdNotificationCardComponent } from './components/bd-notification-card';
import { BdCircleComponent,
  IconWithCountIndicatorComponent,
  NotificationIcon,
  NotificationCardIcon,
  BdCompanyCircleComponent,
  BdUserCircleComponent } from './components/bd-icons';
import { BdPipesModule } from './pipes';
import { BdPerfectScrollbarComponent } from './components/bd-perfect-scrollbar';
import { FilterContainer, AutocompleteFilter, FilterItem } from './components/filter-container';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BdInfiniteScrollComponent } from './components/bd-infinite-scroll';
import { ComplexityPasswordMessengerComponent } from './components/bd-complexity-password-messenger';
import { EmailValidator, PhoneValidator } from './validators';
import { Constants } from './constants/constants';
import { BdContactInfoComponent } from './components/bd-contact-info';
import { BdViewDetailSectionComponent } from './components/bd-view-detail-section';
import { ComponentActionPanelComponent,
  ListButtonsControlComponent,
  DefaultListButtonsComponent,
  DefaultEditRemoveButtonComponent,
  DefaultDragNDropButtonComponent } from './components/component-action-panel';
import { DefaultComponentActionPanelComponent } from './components/default-component-action-panel';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    HttpService,
    NotificationService,
    LoadService,
    SocketService,
    CompanyService,
    EquipmentService,
    DriverService,
    ContactService,
    EnumHelperService,
    GoogleService,
    CommodityService,
    FormValidationService,
    DatePipe,
    EmailValidator,
    PhoneValidator,
    StateService,
    LicenseService,
    LocationService,
    StopService,
    Constants
  ],
  declarations: [
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdUploadFileComponent,
    BdFilePreviewComponent,
    BdSpinnerComponent,
    BdFormSpinnerComponent,
    BdFormTypeaheadComponent,
    BdFormExpandComponent,
    BdButtonComponent,
    BdRemoveButtonComponent,
    BdAddButtonComponent,
    BdFormSectionComponent,
    BdButtonSwitchComponent,
    BdCheckbox,
    BdCheckboxes,
    BdFormCheckbox,
    BdFormSwitchComponent,
    GoogleMapComponent,
    FormNavigationComponent,
    NavigationAnchorComponent,
    AddressItemTemplate,
    StickyDirective,
    BlurForwarderDirective,
    ClickOutsideDirective,
    FormStickyBottomContainerComponent,
    BdFormDateTimePicker,
    BdFormDatePicker,
    BdDatePicker,
    BdFormTimePicker,
    StopsLineComponent,
    StopPopoverComponent,
    BdResizerComponent,
    BdResizeContainerComponent,
    BdCircleComponent,
    BdUserCircleComponent,
    BdCompanyCircleComponent,
    IconWithCountIndicatorComponent,
    BdNotificationPopoverComponent,
    NotificationIcon,
    MessageCardComponent,
    TaskCardComponent,
    NotificationCardComponent,
    BdNotificationCardComponent,
    NotificationIcon,
    NotificationCardIcon,
    BdPerfectScrollbarComponent,
    FilterContainer,
    AutocompleteFilter,
    FilterItem,
    BdInfiniteScrollComponent,
    ComplexityPasswordMessengerComponent,
    TimePickerComponent,
    BdContactInfoComponent,
    BdViewDetailSectionComponent,
    EmptyComponent,
    BdContactInfoComponent,
    MultiPaneLayoutComponent,
    ComponentActionPanelComponent,
    ListButtonsControlComponent,
    DefaultListButtonsComponent,
    DefaultEditRemoveButtonComponent,
    DefaultDragNDropButtonComponent,
    DefaultComponentActionPanelComponent
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
    BdPopoverModule,
    InfiniteScrollModule,
    BdPipesModule,
    BdValidatorModule
  ],
  exports: [
    BdFormButtonComponent,
    BdTextareaAutosize,
    BdInputComponent,
    BdUploadFileComponent,
    BdFilePreviewComponent,
    BdSpinnerComponent,
    BdFormSpinnerComponent,
    GoogleMapComponent,
    BdFormTypeaheadComponent,
    BdFormSectionComponent,
    BdButtonSwitchComponent,
    BdCheckbox,
    BdCheckboxes,
    BdFormCheckbox,
    BdFormSwitchComponent,
    TypeaheadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    BdFormExpandComponent,
    BdButtonComponent,
    BdRemoveButtonComponent,
    BdAddButtonComponent,
    BdFormDateTimePicker,
    BdFormDatePicker,
    BdFormTimePicker,
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
    BdResizeContainerComponent,
    BdCircleComponent,
    BdUserCircleComponent,
    BdCompanyCircleComponent,
    IconWithCountIndicatorComponent,
    BdNotificationPopoverComponent,
    MessageCardComponent,
    TaskCardComponent,
    NotificationCardComponent,
    BdNotificationCardComponent,
    NotificationIcon,
    NotificationCardIcon,
    BdPipesModule,
    BdPerfectScrollbarComponent,
    FilterContainer,
    AutocompleteFilter,
    FilterItem,
    BdInfiniteScrollComponent,
    ComplexityPasswordMessengerComponent,
    BdContactInfoComponent,
    BdViewDetailSectionComponent,
    MultiPaneLayoutComponent,
    BdValidatorModule,
    ComponentActionPanelComponent,
    DefaultListButtonsComponent,
    DefaultEditRemoveButtonComponent,
    DefaultDragNDropButtonComponent,
    DefaultComponentActionPanelComponent
  ]
})
export class SharedModule {

}
