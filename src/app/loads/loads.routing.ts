import { NgModule } from '@angular/core';
import {
  LoadEditComponent,
  LoadDetailComponent,
  LoadEditStopComponent,
  LoadEditInfoComponent
} from './components';

import { LoadsComponent } from './loads.component';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../guards';
import { EmptyComponent } from '../shared/components/empty';

const routes: Routes = [{
  path: '',
  component: LoadsComponent,
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
          path: 'edit',
          component: LoadEditComponent,
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
          component: LoadDetailComponent,
          outlet: 'detailOutlet',
      },
      {
        path: '',
        component: EmptyComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit-stop/:id',
        component: LoadEditStopComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit-info',
        component: LoadEditInfoComponent,
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
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadRoutingModule { }
