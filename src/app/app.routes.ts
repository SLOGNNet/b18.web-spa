import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers';
import { HomeComponent } from './home';
import { BdLoadFormComponent } from './forms/load-form';
import { NoContentComponent } from './no-content';
import { TypeaheadDemoComponent } from './typeahead/typeahead.component.ts';
import { DataResolver } from './app.resolver';
import { LoadsComponent, LoadDetailComponent } from './loads';
import { CustomersComponent, CustomerDetailComponent } from './customers';
import { EquipmentComponent } from './equipment';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/loads', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'drivers/:id', component: DriversComponent },
  { path: 'loads', component: LoadsComponent, children: [{
        path: ':id',
        component: LoadDetailComponent
      }
    ]
  },
  { path: 'customers', component: CustomersComponent, children: [{
        path: ':id',
        component: CustomerDetailComponent
      }
    ]
  },
  { path: 'equipment', component: EquipmentComponent },
  { path: '**',    component: NoContentComponent }
];
