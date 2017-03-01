import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content';
import { AuthGuard } from './auth';
import { MainComponent } from './main/main.component';
import { MAIN_ROUTES } from './main/main.routing';

export const ROUTES: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: MainComponent, children: MAIN_ROUTES, canActivate: [AuthGuard] },
  { path: '', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', component: NoContentComponent }
];
