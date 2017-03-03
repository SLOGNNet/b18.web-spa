import { NgModule } from '@angular/core';
import { CompanyForm } from './company-form';
import { AddressForm } from './address-form';
import { ContactsForm } from './contacts-form';
import { ContactForm } from './contact-form';
import { AddressesForm } from './addresses-form';
import { DriverForm } from './driver-form';
import { DropoffFormComponent } from './dropoff-form';
import { DropoffsFormComponent } from './dropoffs-form';
import { PickupFormComponent } from './pickup-form';
import { PickupsFormComponent } from './pickups-form';
import { LoadDocumentFormComponent } from './load-document-form';
import { SharedModule } from '../shared/shared.module';

import { BdLoadFormComponent } from './load-form';
import { PickupCommodityComponent, DropoffpCommodityComponent, CommoditiesHeaderComponent,
  PickUpCommodityFormComponent, DropOffCommodityFormComponent } from './commodities-forms';

@NgModule({
  declarations: [
    CompanyForm,
    AddressForm,
    AddressesForm,
    ContactForm,
    ContactsForm,
    BdLoadFormComponent,
    DropoffpCommodityComponent,
    PickupCommodityComponent,
    CommoditiesHeaderComponent,
    DriverForm,
    DropoffFormComponent,
    DropoffsFormComponent,
    PickupFormComponent,
    PickupsFormComponent,
    PickUpCommodityFormComponent,
    DropOffCommodityFormComponent,
    LoadDocumentFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CompanyForm,
    BdLoadFormComponent,
    DriverForm,
    LoadDocumentFormComponent
  ]
})
export class BdFormsModule {
}
