import { NgModule } from '@angular/core';
import { CompanyForm } from './company-form';
import { AddressForm } from './address-form';
import { ContactsForm } from './contacts-form';
import { ContactForm } from './contact-form';
import { AddressesForm } from './addresses-form';
import { DropoffFormComponent } from './dropoff-form';
import { DropoffsFormComponent } from './dropoffs-form';
import { PickupFormComponent } from './pickup-form';
import { PickupsFormComponent } from './pickups-form';
import { LoadDocumentFormComponent } from './load-document-form';
import { SharedModule } from '../shared/shared.module';

import { LoadFormComponent } from './load-form';
import { PickupCommodityComponent, DropoffpCommodityComponent, CommoditiesHeaderComponent,
  PickUpCommodityFormComponent, DropOffCommodityFormComponent } from './commodities-forms';

@NgModule({
  declarations: [
    CompanyForm,
    AddressForm,
    AddressesForm,
    ContactForm,
    ContactsForm,
    LoadFormComponent,
    DropoffpCommodityComponent,
    PickupCommodityComponent,
    CommoditiesHeaderComponent,
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
    LoadFormComponent,
    LoadDocumentFormComponent
  ]
})
export class BdFormsModule {
}
