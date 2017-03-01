import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginComponent,
  RegisterComponent,
  PhoneConfirmationComponent,
  EmailConfirmationComponent,
  AuthWrapperComponent
} from './';

const routes: Routes = [{
  path: '',
  component: AuthWrapperComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'phone-confirmation', component: PhoneConfirmationComponent },
    { path: 'email-confirmation', component: EmailConfirmationComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
