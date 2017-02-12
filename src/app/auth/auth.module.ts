import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BdFormsModule } from '../forms/forms.module';

import { AuthWrapperComponent, LoginComponent, RegisterComponent, RegisterStep1Component } from './components';
import { LoginFormComponent, RegisterFormStep1Component } from './forms';
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
    RegisterStep1Component,
    LoginFormComponent,
    RegisterFormStep1Component
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  exports: [
  ]
})
export class AuthModule { }
