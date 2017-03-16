import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../shared';

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

  login(model) {
    let data = new URLSearchParams();
    data.set('grant_type', 'password');
    data.set('username', model.username);
    data.set('password', model.password);
    data.set('client_id', 'client');
    data.set('client_secret', 'secret');
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

  signUp(model) {
    let navigateToUrl = model.registerType === 'email' ? '/auth/email-was-sent' : '/auth/phone-confirmation';
    model.password = model.passwordGroup.password;
    model.retryPassword = model.passwordGroup.retryPassword;
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}auth/users`, model).subscribe(
        response => {
          this.router.navigate([navigateToUrl]);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  confirmEmail(params) {
    return Observable.create((observer) => {
      this.http.post(`${this.config.authUrl}auth/invitations/${params.invitationToken}/email/${params.verificationToken}`, {}).subscribe(
        response => {
          this.token = response.json() && response.json().accessToken;
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

  confirmPhone(model) {
    return Observable.create((observer) => {
      if (Object.keys(model).length)  {
        this.router.navigate(['auth/login']);
      } else {
        observer.next(false);
      }
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
