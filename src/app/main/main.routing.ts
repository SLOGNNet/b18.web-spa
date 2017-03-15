import { MainComponent } from './main.component';
import { DriversComponent, DriverEditComponent, DriverDetailComponent } from '../drivers';
import { MessagesComponent } from '../drivers/messages';
import { HomeComponent } from '../home';
import { LoadsComponent, LoadEditComponent, LoadDetailComponent } from '../loads';
import { CompaniesComponent, CompanyEditComponent, CompanyDetailComponent } from '../companies';
import { EquipmentComponent } from '../equipment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth';
import { CanDeactivateGuard } from '../guards';
import { NoContentComponent } from '../no-content';
import { DriversModule } from '../drivers';
import { EmptyComponent } from '../shared/components/empty';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    { path: '', redirectTo: 'loads', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
      path: 'drivers', loadChildren: () => DriversModule
    },
    {
      path: 'loads', component: LoadsComponent,
      children: [
    {
      path: ':id',
      children: [
      {
          path: '',
          component: LoadDetailComponent,
          outlet: 'detailOutlet',
      },
      {
        path: '',
        component: EmptyComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
          path: 'edit',
          component: EmptyComponent,
          canDeactivate: [CanDeactivateGuard]
      }
      ]
    }
  ]
    },
    {
      path: 'companies', component: CompaniesComponent, children: [{
      path: '0',
      children: [
        {
          path: '',
          component: EmptyComponent,
          outlet: 'detailOutlet',
        },
        {
          path: 'edit',
          component: CompanyEditComponent,
          data: { new: true },
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    },
    {
      path: ':id',
      children: [
      {
          path: '',
          component: CompanyDetailComponent,
          outlet: 'detailOutlet',
      },
      {
        path: '',
        component: EmptyComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
          path: 'edit',
          component: CompanyEditComponent,
          canDeactivate: [CanDeactivateGuard]
      }
      ]
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
