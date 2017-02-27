import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BdFormsModule } from '../forms/forms.module';

import {
  AuthWrapperComponent,
  LoginComponent,
  RegisterComponent,
  PhoneConfirmationComponent,
  EmailConfirmationComponent
 } from './components';
import {
  LoginFormComponent,
  RegisterFormComponent,
  PhoneConfirmationFormComponent
} from './forms';
import { AuthGuard } from './guards';
import { AuthenticationService } from './services';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    BdFormsModule
  ],
  declarations: [
    AuthWrapperComponent,
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PhoneConfirmationComponent,
    PhoneConfirmationFormComponent,
    EmailConfirmationComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  exports: [
  ]
})
export class AuthModule { }
