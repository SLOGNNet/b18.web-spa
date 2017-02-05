import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services';

@Component({
  selector: 'br-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  model: any = {};

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  login() {
    this.authenticationService.login(this.model);
    this.router.navigate(['/login']);
  }
}

