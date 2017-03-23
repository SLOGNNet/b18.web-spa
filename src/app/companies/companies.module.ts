import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

import {
  CompanyCardComponent,
  CompanyCardsComponent,
  CompanyEditComponent,
  CompanyEditContactComponent,
  CompanyDetailComponent,
  CompanyBasicInformation,
  CompanyEditInfoComponent,
  CompanyAddress,
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
    CompanyEditComponent,
    CompanyDetailComponent,
    CompanyBasicInformation,
    CompanyEditInfoComponent,
    CompanyEditContactComponent,
    CompanyAddress,
    CompanyContact
  ]
})
export class CompaniesModule { }
