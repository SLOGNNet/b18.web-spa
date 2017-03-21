import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginComponent,
  RegisterComponent,
  RegisterPhoneConfirmationComponent,
  RegisterEmailConfirmationComponent,
  RegisterEmailSentComponent,
  AuthWrapperComponent,
  PasswordRecoveryComponent,
  PasswordRecoveryPhoneConfirmationComponent,
  PasswordRecoveryEmailSentComponent,
  PasswordRecoveryEmailConfirmationComponent,
  NewPasswordComponent,
  TestFormComponent
} from './';
import { NoContentComponent } from '../no-content';

const routes: Routes = [{
  path: 'auth',
  component: AuthWrapperComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register/email-sent', component: RegisterEmailSentComponent },
    { path: 'register/phone-confirmation/:invitationToken', component: RegisterPhoneConfirmationComponent },
    { path: 'register/email-confirmation/:invitationToken/:verificationToken', component: RegisterEmailConfirmationComponent },
    { path: 'password-recovery', component: PasswordRecoveryComponent },
    { path: 'password-recovery/phone-confirmation/:cellphoneRecoveryToken', component: PasswordRecoveryPhoneConfirmationComponent },
    { path: 'password-recovery/email-sent', component: PasswordRecoveryEmailSentComponent },
    { path: 'password-recovery/email-confirmation/:recoveryToken/:verificationToken', component: PasswordRecoveryEmailConfirmationComponent },
    { path: 'new-password/:recoveryToken', component: NewPasswordComponent },
    { path: 'test-form', component: TestFormComponent },
    { path: '**', component: NoContentComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
