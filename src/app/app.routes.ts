import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers';
import { HomeComponent } from './home';
import { BdLoadFormComponent } from './forms/load-form';
import { NoContentComponent } from './no-content';
import { TypeaheadDemoComponent } from './typeahead/typeahead.component.ts';
import { DataResolver } from './app.resolver';
import { LoadsComponent, LoadDetailComponent } from './loads';
import {
  AuthGuard,
  LoginComponent,
  RegisterComponent,
  PhoneConfirmationComponent,
  EmailConfirmationComponent
} from './auth';
import { CompaniesComponent, CompanyDetailComponent } from './companies';
import { EquipmentComponent } from './equipment';
import { MessagesComponent } from './drivers/messages';
export const ROUTES: Routes = [
  { path: '', redirectTo: '/loads', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'drivers/:id', component: DriversComponent },
  { path: 'drivers/:id/messages', component: MessagesComponent },
  { path: 'loads', component: LoadsComponent, children: [{
        path: ':id',
        component: LoadDetailComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'companies', component: CompaniesComponent, children: [{
        path: ':id',
        component: CompanyDetailComponent
      }
    ]
  },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'phone-confirmation', component: PhoneConfirmationComponent },
  { path: 'email-confirmation', component: EmailConfirmationComponent },
  { path: '**',    component: NoContentComponent }
];
