import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BdFormsModule } from '../forms/forms.module';

import { LoginComponent } from './components';
import { LoginFormComponent } from './forms';
import { AuthGuard } from './guards';
import { AuthenticationService } from './services';

@NgModule({
  imports: [
    SharedModule,
    BdFormsModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  exports: [
  ]
})
export class AuthModule { }
