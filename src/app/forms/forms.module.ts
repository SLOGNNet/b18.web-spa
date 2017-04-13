import { NgModule } from '@angular/core';
import { CompanyInfoForm } from './company-info-form';
import { AddressForm } from './address-form';
import { ContactsForm } from './contacts-form';
import { ContactForm } from './contact-form';
import { LocationsForm } from './locations-form';
import { DriverForm } from './driver-form';
import { LoadDocumentFormComponent } from './load-document-form';
import { SharedModule } from '../shared/shared.module';
import { ContactInfoForm } from './contact-info-form';
import { ContactsInfoForm } from './contacts-info-form';
import { LoadFormComponent } from './load-form';
import { LoadInfoFormComponent } from './load-info-form';
import { LicenseForm } from './license-form';
import { LocationForm } from './location-form';
import { EquipmentForm } from './equipment-form';
import { MileagesForm } from './mileages-form';
import { MileageForm } from './mileage-form';
import { StopFormComponent } from './stop-form';
import { StopActionsFormComponent } from './stop-actions-form';
import { StopActionPickupFormComponent } from './stop-action-pickup-form';
import { StopActonDropoffFormComponent } from './stop-action-dropoff-form';

import { PickupCommodityComponent, DropoffpCommodityComponent, CommoditiesHeaderComponent,
  PickUpCommodityFormComponent, DropOffCommodityFormComponent } from './commodities-forms';

@NgModule({
  declarations: [
    CompanyInfoForm,
    AddressForm,
    LocationsForm,
    ContactForm,
    ContactsForm,
    LoadFormComponent,
    LoadInfoFormComponent,
    DropoffpCommodityComponent,
    PickupCommodityComponent,
    CommoditiesHeaderComponent,
    DriverForm,
    PickUpCommodityFormComponent,
    DropOffCommodityFormComponent,
    LoadDocumentFormComponent,
    ContactsInfoForm,
    ContactInfoForm,
    LicenseForm,
    LocationForm,
    EquipmentForm,
    MileagesForm,
    MileageForm,
    StopFormComponent,
    StopActionsFormComponent,
    StopActionPickupFormComponent,
    StopActonDropoffFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CompanyInfoForm,
    ContactForm,
    LoadFormComponent,
    LoadInfoFormComponent,
    DriverForm,
    LoadDocumentFormComponent,
    CommoditiesHeaderComponent,
    DropoffpCommodityComponent,
    PickupCommodityComponent,
    LicenseForm,
    LocationForm,
    EquipmentForm,
    MileagesForm,
    MileageForm,
    StopFormComponent
  ]
})
export class BdFormsModule {
}
