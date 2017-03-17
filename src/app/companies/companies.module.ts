import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

import {
  CompanyCardComponent,
  CompanyCardsComponent,
  CompanyEditComponent,
  CompanyDetailComponent,
  CompanyBasicInformation,
  CompanyAddress
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
    CompanyAddress
  ]
})
export class CompaniesModule { }
