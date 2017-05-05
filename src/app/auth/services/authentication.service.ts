import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../shared';
import { CustomQueryEncoderHelper } from '../../shared/helpers';

@Injectable()
export class AuthenticationService {

  private loggedIn = false;
  private token: string;

  constructor(
    private router: Router,
    private http: HttpService,
    @Inject('AppConfig') private config
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.loggedIn = !!this.token;
  }

  login(formModel) {
    let data = new URLSearchParams('', new CustomQueryEncoderHelper());
    data.append('grant_type', 'password');
    data.append('username', formModel.username);
    data.append('password', formModel.password);
    data.append('client_id', 'client');
    data.append('client_secret', 'secret');
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}oauth/token`, data).subscribe(
        response => {
          this.token = response.json() && response.json().access_token;
          this.setToken(this.token);
          this.loggedIn = true;
          this.router.navigate(['loads']);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  signUp(formModel) {
    // if cellphone chosed, email key - should be removed for backend correct validation
    if (formModel.userNameType === 'phone') {
      delete formModel.email;
    }
    // if email chosed, phone key - should be removed for backend correct validation
    if (formModel.userNameType === 'email') {
      delete formModel.cellphone;
    }
    formModel.password = formModel.passwordGroup.password;
    formModel.retryPassword = formModel.passwordGroup.retryPassword;
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}auth/users`, formModel).subscribe(
        response => {
          if (formModel.userNameType === 'email') {
            this.router.navigate(['/auth/register/email-sent']);
          } else if (formModel.userNameType === 'phone') {
            let invitationToken = response.json().invitationToken;
            this.router.navigate(['/auth/register/phone-confirmation', invitationToken]);
          }
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  signUpConfirmEmail(params) {
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}auth/invitations/${params.invitationToken}/email/${params.verificationToken}`, {}).subscribe(
        response => {
          this.router.navigate(['auth/login'], {queryParams: {'registration-completed': true}});
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  signUpConfirmPhone(invitationToken, verificationToken) {
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}auth/invitations/${invitationToken}/cellphone/${verificationToken}`, {}).subscribe(
        response => {
          this.router.navigate(['auth/login'], {queryParams: {'registration-completed': true}});
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  passwordRecoveryGetRecoveryInstructions(formModel) {
    // if cellphone chosed, email key - should be removed for backend correct validation
    if (formModel.userNameType === 'phone') {
      delete formModel.email;
    }
    // if email chosed, phone key - should be removed for backend correct validation
    if (formModel.userNameType === 'email') {
      delete formModel.cellphone;
    }
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}auth/passwords`, formModel).subscribe(
        response => {
          if (formModel.userNameType === 'email') {
            this.router.navigate(['/auth/password-recovery/email-sent']);
          } else if (formModel.userNameType === 'phone') {
            let cellphoneRecoveryToken = response.json().cellphoneRecoveryToken;
            this.router.navigate(['/auth/password-recovery/phone-confirmation', cellphoneRecoveryToken]);
          }
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  passwordRecoveryPhoneConfirmation(recoveryToken, verificationToken) {
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}auth/passwords/${recoveryToken}/cellphone/${verificationToken}`, {}).subscribe(
        response => {
          this.router.navigate(['/auth/new-password', recoveryToken]);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  passwordRecoveryConfirmEmail(params) {
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}auth/passwords/${params.recoveryToken}/email/${params.verificationToken}`, {}).subscribe(
        response => {
          this.router.navigate(['/auth/new-password', params.recoveryToken]);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  newPassword(recoveryToken, formModel) {
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}auth/passwords/${recoveryToken}/password`, formModel).subscribe(
        response => {
          this.router.navigate(['auth/login'], {queryParams: {'password-changed': true}});
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['auth/login']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  private getToken() {
    return this.token;
  }

  private setToken(token) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    currentUser.token = token;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

}
