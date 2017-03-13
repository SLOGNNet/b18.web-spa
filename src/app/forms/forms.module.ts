import { NgModule } from '@angular/core';
import { CompanyForm } from './company-form';
import { AddressForm } from './address-form';
import { ContactsForm } from './contacts-form';
import { ContactForm } from './contact-form';
import { LocationsForm } from './locations-form';
import { DriverForm } from './driver-form';
import { DriverViewForm } from './driver-view-form';
import { DropoffFormComponent } from './dropoff-form';
import { DropoffsFormComponent } from './dropoffs-form';
import { PickupFormComponent } from './pickup-form';
import { PickupsFormComponent } from './pickups-form';
import { LoadDocumentFormComponent } from './load-document-form';
import { SharedModule } from '../shared/shared.module';
import { ContactInfoForm } from './contact-info-form';
import { ContactsInfoForm } from './contacts-info-form';
import { LoadFormComponent } from './load-form';
import { LicenseForm } from './license-form';
import { LocationForm } from './location-form';
import { PickupCommodityComponent, DropoffpCommodityComponent, CommoditiesHeaderComponent,
  PickUpCommodityFormComponent, DropOffCommodityFormComponent } from './commodities-forms';

@NgModule({
  declarations: [
    CompanyForm,
    AddressForm,
    LocationsForm,
    ContactForm,
    ContactsForm,
    LoadFormComponent,
    DropoffpCommodityComponent,
    PickupCommodityComponent,
    CommoditiesHeaderComponent,
    DriverForm,
    DriverViewForm,
    DropoffFormComponent,
    DropoffsFormComponent,
    PickupFormComponent,
    PickupsFormComponent,
    PickUpCommodityFormComponent,
    DropOffCommodityFormComponent,
    LoadDocumentFormComponent,
    ContactsInfoForm,
    ContactInfoForm,
    LicenseForm,
    LocationForm
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CompanyForm,
    LoadFormComponent,
    DriverForm,
    DriverViewForm,
    LoadDocumentFormComponent,
    CommoditiesHeaderComponent,
    DropoffpCommodityComponent,
    PickupCommodityComponent,
    LicenseForm,
    LocationForm
  ]
})
export class BdFormsModule {
}
