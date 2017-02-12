import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';

@Component(Object.assign({
  selector: 'bd-register-form-step1',
  templateUrl: './register-form-step1.component.html',
  styleUrls: ['./register-form-step1.component.scss']
}, BaseForm.metaData))
export class RegisterFormStep1Component extends BaseForm implements OnInit {

  registerForm: FormGroup;
  registerTypes: Array<any>;

  constructor(
    private authenticationService: AuthenticationService,
    element: ElementRef) {
    super(element);
    this.registerTypes = [
      {
        key: 'email',
        value: 'Email'
      },
      {
        key: 'phone',
        value: 'Phone'
      }
    ];
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      registerType: new FormControl('email', [Validators.required]),
      email: new FormControl('',  [Validators.required]),
      phone: new FormControl('',  [Validators.required]),
      password: new FormControl('',  [Validators.required]),
      retryPassword: new FormControl('',  [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
    // this.authenticationService.login(form.value).subscribe(
    //   response => {
    //     if (!response) {
    //       this.isLoginFailed = true;
    //       this.loginForm.markAsPristine();
    //     }
    //   }
    // );
  }

}
