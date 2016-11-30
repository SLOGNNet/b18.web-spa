import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers';
import { HomeComponent } from './home';
import { BdCustomerFormComponent } from './forms/customer-form';
import { NoContentComponent } from './no-content';
import { TypeaheadDemoComponent } from './typeahead/typeahead.component.ts';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'drivers/:id', component: DriversComponent },
  { path: 'customer-form', component: BdCustomerFormComponent },
  { path: 'typeahead', component: TypeaheadDemoComponent },
  { path: '**',    component: NoContentComponent },
];
