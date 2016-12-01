import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers';
import { HomeComponent } from './home';
import { BdLoadFormComponent } from './forms/load-form';
import { NoContentComponent } from './no-content';
import { TypeaheadDemoComponent } from './typeahead/typeahead.component.ts';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'drivers/:id', component: DriversComponent },
  { path: 'load-form', component: BdLoadFormComponent },
  { path: 'typeahead', component: TypeaheadDemoComponent },
  { path: '**',    component: NoContentComponent },
];
