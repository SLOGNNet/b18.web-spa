import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';

@Component(Object.assign({
  selector: 'bd-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
}, BaseForm.metaData))
export class RegisterFormComponent extends BaseForm implements OnInit {

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
      phone: new FormControl(''),
      password: new FormControl('',  [Validators.required]),
      retryPassword: new FormControl('',  [Validators.required, this.isEqualPassword.bind(this)])
    });
    this.subscribeTypeChanges();
  }

  onSubmit(form: FormGroup) {
    this.authenticationService.signUp(form.value).subscribe(
      response => {
        if (!response) {
          console.log('error');
        }
      }
    );
  }

  subscribeTypeChanges() {
    const typeCtrl = (<any>this.registerForm).controls.registerType;
    const emailCtrl = (<any>this.registerForm).controls.email;
    const phoneCtrl = (<any>this.registerForm).controls.phone;
    const changes$ = typeCtrl.valueChanges;
    changes$.subscribe(type => {
      if (type === 'email') {
        emailCtrl.setValidators([Validators.required]);
        phoneCtrl.setValidators(null);
      } else {
        emailCtrl.setValidators(null);
        phoneCtrl.setValidators([Validators.required]);
      }
      emailCtrl.updateValueAndValidity();
      phoneCtrl.updateValueAndValidity();
    });
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
      if (!this.registerForm) {
        return {passwordsNotMatch: true};
      }
      if (control.value !== this.registerForm.controls['password'].value) {
        return {passwordsNotMatch: true};
      }
    }

}
