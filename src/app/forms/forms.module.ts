import { NgModule } from '@angular/core';
import { CustomerForm } from './customer-form';
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

import { BdLoadFormComponent } from './load-form';
import { PickupCommodityComponent, DropoffpCommodityComponent, CommoditiesHeaderComponent,
  PickUpCommodityFormComponent, DropOffCommodityFormComponent } from './commodities-forms';

@NgModule({
  declarations: [
    CustomerForm,
    AddressForm,
    AddressesForm,
    ContactForm,
    ContactsForm,
    BdLoadFormComponent,
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
    CustomerForm,
    BdLoadFormComponent,
    LoadDocumentFormComponent
  ]
})
export class BdFormsModule {
}
