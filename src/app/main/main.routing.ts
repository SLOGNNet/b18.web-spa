import { MainComponent } from './main.component';
import { DriversComponent, DriverEditComponent } from '../drivers';
import { MessagesComponent } from '../drivers/messages';
import { HomeComponent } from '../home';
import { LoadsComponent, LoadEditComponent } from '../loads';
import { CompaniesComponent, CompanyEditComponent } from '../companies';
import { EquipmentComponent } from '../equipment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth';
import { CanDeactivateGuard } from '../guards';
import { NoContentComponent } from '../no-content';

const routes: Routes = [{
  path: '',
  component: MainComponent, canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'loads', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
      path: 'drivers', component: DriversComponent, children: [{
        path: ':id',
        component: DriverEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }]
    },
    { path: 'drivers/:id/messages', component: MessagesComponent },
    {
      path: 'loads', component: LoadsComponent
    },
    {
      path: 'companies', component: CompaniesComponent, children: [{
        path: ':id',
        component: CompanyEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }]
    },
    { path: 'equipment', component: EquipmentComponent },
    { path: '**', component: NoContentComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
