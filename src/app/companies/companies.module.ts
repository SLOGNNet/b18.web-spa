import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

import {
  CompanyCardComponent,
  CompanyCardsComponent,
  CompanyEditContactComponent,
  CompanyDetailComponent,
  CompanyBasicInformation,
  CompanyEditInfoComponent,
  CompanyAddress,
  CompanyEditLocationComponent,
  CompanyContact
} from './components';
import { CompaniesComponent } from './companies.component';
import { CompanyRoutingModule } from './companies.routing';
import { BdFormsModule } from '../forms/forms.module';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    SharedModule,
    BdFormsModule,
    CompanyRoutingModule
  ],
  declarations: [
    CompanyCardComponent,
    CompanyCardsComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyBasicInformation,
    CompanyEditInfoComponent,
    CompanyEditContactComponent,
    CompanyEditLocationComponent,
    CompanyAddress,
    CompanyContact
  ]
})
export class CompaniesModule { }
