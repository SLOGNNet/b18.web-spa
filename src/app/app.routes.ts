import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'drivers/:id',
    component: DriversComponent
  },
  {
    path: '**',
    component: NoContentComponent
  }
];
