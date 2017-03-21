import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BdFormsModule } from '../forms/forms.module';

import {
  AuthWrapperComponent,
  AuthGeneralFormErrorComponent,
  AuthFormMessageHelperComponent,
  LoginComponent,
  RegisterComponent,
  RegisterPhoneConfirmationComponent,
  RegisterEmailSentComponent,
  RegisterEmailConfirmationComponent,
  PasswordRecoveryComponent,
  PasswordRecoveryPhoneConfirmationComponent,
  PasswordRecoveryEmailSentComponent,
  PasswordRecoveryEmailConfirmationComponent,
  NewPasswordComponent,
  TestFormComponent
 } from './components';
import {
  LoginFormComponent,
  RegisterFormComponent,
  RegisterPhoneConfirmationFormComponent,
  PasswordRecoveryFormComponent,
  PasswordRecoveryPhoneConfirmationFormComponent,
  NewPasswordFormComponent
} from './forms';
import { AuthGuard } from './guards';
import { AuthenticationService } from './services';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    BdFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthWrapperComponent,
    AuthGeneralFormErrorComponent,
    AuthFormMessageHelperComponent,
    LoginComponent,
    RegisterComponent,
    RegisterPhoneConfirmationComponent,
    RegisterEmailSentComponent,
    RegisterEmailConfirmationComponent,
    PasswordRecoveryComponent,
    PasswordRecoveryPhoneConfirmationComponent,
    PasswordRecoveryEmailSentComponent,
    PasswordRecoveryEmailConfirmationComponent,
    NewPasswordComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterPhoneConfirmationFormComponent,
    PasswordRecoveryFormComponent,
    PasswordRecoveryPhoneConfirmationFormComponent,
    NewPasswordFormComponent,
    TestFormComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  exports: [
  ]
})
export class AuthModule { }
