import { MainComponent } from './main.component';
import { HomeComponent } from '../home';
import { LoadsComponent, LoadDetailComponent, LoadEditComponent } from '../loads';
import { EquipmentModule } from '../equipment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../guards';
import { NoContentComponent } from '../no-content';
import { DriversModule } from '../drivers';
import { CompaniesModule } from '../companies';
import { AuthGuard } from '../auth';
import { EmptyComponent } from '../shared/components/empty';

const routes: Routes = [{
  path: '',
  component: MainComponent, canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'loads', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
      path: 'drivers', loadChildren: () => DriversModule
    },
    {
      path: 'loads', component: LoadsComponent,
      children:   [
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
          component: LoadEditComponent,
          canDeactivate: [CanDeactivateGuard]
      }
      ]
    }
  ]
    },
    {
      path: 'companies', loadChildren: () => CompaniesModule
    },
    { path: 'equipment',  loadChildren: () => EquipmentModule },
    { path: '**', component: NoContentComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
