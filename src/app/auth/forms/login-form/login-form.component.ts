import { Component, ElementRef, OnInit, ChangeDetectorRef  } from '@angular/core';
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
  isLoading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private cd: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    this.isLoginFailed = false;
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.authenticationService.login(form.value).subscribe(response => {
      if (response === 'login_failed') {
        this.isLoginFailed = true;
        this.loginForm.markAsPristine();
        this.cd.markForCheck();
      }
      this.isLoading = false;
    });
  }

}
