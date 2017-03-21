import { NgModule } from '@angular/core';
import { EquipmentDetailComponent, EquipmentEditComponent } from './components';
import { EquipmentComponent } from './equipment.component';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../guards';
import { EmptyComponent } from '../shared/components/empty';

const routes: Routes = [{
  path: '',
  component: EquipmentComponent,
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
          component: EquipmentEditComponent,
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
          component: EquipmentEditComponent,
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
