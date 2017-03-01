import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  loggedStateWasChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedIn = false;

  constructor(private router: Router) {
    this.loggedIn = !!localStorage.getItem('currentUser');
    this.loggedStateWasChanged.next(this.loggedIn);
  }

  login(model) {
    return Observable.create((observer) => {
      if (model.login.toLowerCase() === 'admin' && model.password.toLowerCase() === 'admin')  {
        this.loggedIn = true;
        this.loggedStateWasChanged.next(this.loggedIn);
        localStorage.setItem('currentUser', JSON.stringify(model));
        this.router.navigate(['loads']);
      } else {
        observer.next(this.loggedIn);
      }
    });
  }

  signUp(model) {
    return Observable.create((observer) => {
      if (Object.keys(model).length)  {
        this.router.navigate(['auth/phone-confirmation']);
      } else {
        observer.next(false);
      }
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
    this.loggedStateWasChanged.next(this.loggedIn);
    localStorage.removeItem('currentUser');
    this.router.navigate(['auth/login']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
