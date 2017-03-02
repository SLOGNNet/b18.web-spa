import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginComponent,
  RegisterComponent,
  PhoneConfirmationComponent,
  EmailConfirmationComponent,
  AuthWrapperComponent
} from './';
import { NoContentComponent } from '../no-content';

const routes: Routes = [{
  path: 'auth',
  component: AuthWrapperComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'phone-confirmation', component: PhoneConfirmationComponent },
    { path: 'email-confirmation', component: EmailConfirmationComponent },
    { path: '**', component: NoContentComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
