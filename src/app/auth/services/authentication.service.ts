import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AuthenticationService {
  private loggedIn = false;

  constructor() {
    this.loggedIn = !!localStorage.getItem('currentUser');
  }

  login(model) {
    localStorage.setItem('currentUser', JSON.stringify(model));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
