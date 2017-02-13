import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';

@Component(Object.assign({
  selector: 'bd-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
}, BaseForm.metaData))
export class LoginFormComponent extends BaseForm implements OnInit {

  isLoginFailed: boolean;
  loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    this.isLoginFailed = false;
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
    this.authenticationService.login(form.value).subscribe(
      response => {
        if (!response) {
          this.isLoginFailed = true;
          this.loginForm.markAsPristine();
        }
      }
    );
  }

}

