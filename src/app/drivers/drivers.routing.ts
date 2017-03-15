import { NgModule } from '@angular/core';
import { DriverEditComponent, DriverDetailComponent } from './components';
import { DriversComponent } from './drivers.component';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../guards';
import { EmptyComponent } from '../shared/components/empty';

const routes: Routes = [{
  path: '',
  component: DriversComponent,
  children: [
    {
      path: '0',
      children: [
        {
          path: '',
          component: EmptyComponent,
          outlet: 'detailOutlet',
        },
        {
          path: '',
          component: EmptyComponent,
          canDeactivate: [CanDeactivateGuard]
        },
        {
          path: 'edit',
          component: DriverEditComponent,
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
          component: DriverDetailComponent,
          outlet: 'detailOutlet',
      },
      {
        path: '',
        component: EmptyComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
          path: 'edit',
          component: DriverEditComponent,
          canDeactivate: [CanDeactivateGuard]
      }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
