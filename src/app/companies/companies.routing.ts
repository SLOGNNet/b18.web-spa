import { NgModule } from '@angular/core';
import {
  CompanyEditComponent, CompanyDetailComponent, CompanyEditInfoComponent,
  CompanyEditContactComponent
} from './components';
import { CompaniesComponent } from './companies.component';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../guards';
import { EmptyComponent } from '../shared/components/empty';

const routes: Routes = [{
  path: '',
  component: CompaniesComponent,
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
          path: 'edit-info',
          component: CompanyEditInfoComponent,
          data: { new: true, title: 'New Company' },
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
          path: 'edit-info',
          component: CompanyEditInfoComponent,
          canDeactivate: [CanDeactivateGuard]
        },
        {
          path: 'edit-contact/:id',
          component: CompanyEditContactComponent,
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
export class CompanyRoutingModule { }
