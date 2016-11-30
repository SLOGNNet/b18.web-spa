import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers';
import { HomeComponent } from './home';
import { CustomerFormComponent } from './forms/customer-form';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'drivers/:id', component: DriversComponent },
  { path: 'customer-form', component: CustomerFormComponent },
  { path: '**',    component: NoContentComponent },
];
