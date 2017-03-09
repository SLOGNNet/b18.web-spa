import { Component, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';
import { EmailValidator } from '../../../shared/validators';

@Component(Object.assign({
  selector: 'bd-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss', '../../components/auth-wrapper/spinner.scss']
}, BaseForm.metaData))
export class RegisterFormComponent extends BaseForm implements OnInit {

  registerForm: FormGroup;
  registerTypes: Array<any>;
  isLoading: boolean = false;
  isRegisterFailed: boolean;

  constructor(
    private cd: ChangeDetectorRef,
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
      email: new FormControl('',  [Validators.required, EmailValidator.isValidMailFormat]),
      phone: new FormControl(''),
      passwordGroup: new FormGroup({
        password: new FormControl('',  [Validators.required]),
        retryPassword: new FormControl('',  [Validators.required])
      }, this.matchingPasswords('password', 'retryPassword'))
    });
    this.subscribeTypeChanges();
  }

  onSubmit(form: FormGroup) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.authenticationService.signUp(form.value).subscribe(
      response => {
        this.isLoading = false;
      },
      error => {
        this.isRegisterFailed = true;
        this.registerForm.markAsPristine();
        this.cd.markForCheck();
        this.isLoading = false;
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
        emailCtrl.setValidators([Validators.required, EmailValidator.isValidMailFormat]);
        phoneCtrl.setValidators(null);
      } else {
        emailCtrl.setValidators(null);
        phoneCtrl.setValidators([Validators.required]);
      }
      emailCtrl.updateValueAndValidity();
      phoneCtrl.updateValueAndValidity();
    });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {passwordsNotMatch: true};
      }
    };
  }

}
