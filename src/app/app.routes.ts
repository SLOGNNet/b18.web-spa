import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: DriversComponent },
  { path: '**',    component: NoContentComponent },
];
