import { NgModule } from '@angular/core';
import { EquipmentDetailComponent } from './components';
import { EquipmentComponent } from './equipment.component';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../guards';
import { EmptyComponent } from '../shared/components/empty';

const routes: Routes = [{
  path: '',
  component: EquipmentComponent,
  children: [
    {
      path: ':id',
      children: [
      {
          path: '',
          component: EquipmentDetailComponent,
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
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
