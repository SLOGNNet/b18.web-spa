import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '', loadChildren: './app/main/main.module#MainModule' },
  { path: 'auth', loadChildren: './app/auth/auth.module#AuthModule' },
  { path: '**', component: NoContentComponent }
];
