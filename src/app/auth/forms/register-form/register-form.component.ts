import { Component, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';
import { EmailValidator, PhoneValidator } from '../../../shared/validators';
import { Constants } from '../../../shared';

@Component(Object.assign({
  selector: 'bd-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss', '../../../../assets/styles/form-control.scss']
}, BaseForm.metaData))
export class RegisterFormComponent extends BaseForm implements OnInit {

  registerForm: FormGroup;
  isLoading: boolean = false;
  isRegisterFailed: boolean;
  errorDescription: string;

  constructor(
    private cd: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private constants: Constants,
    element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userNameType: new FormControl(this.constants.USER_NAME_TYPES[0].key, [Validators.required]),
      email: new FormControl('',  [Validators.required, EmailValidator.isValidMailFormat]),
      cellphone: new FormControl(''),
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
        this.errorDescription = error.description || error.message;
        this.isRegisterFailed = true;
        this.registerForm.markAsPristine();
        this.cd.markForCheck();
        this.isLoading = false;
      }
    );
  }

  subscribeTypeChanges() {
    const typeCtrl = (<any>this.registerForm).controls.userNameType;
    const emailCtrl = (<any>this.registerForm).controls.email;
    const cellphoneCtrl = (<any>this.registerForm).controls.cellphone;
    const changes$ = typeCtrl.valueChanges;
    changes$.subscribe(type => {
      if (type === 'email') {
        emailCtrl.setValidators([Validators.required, EmailValidator.isValidMailFormat]);
        cellphoneCtrl.setValidators(null);
      } else {
        emailCtrl.setValidators(null);
        cellphoneCtrl.setValidators([Validators.required, PhoneValidator.isValidPhoneFormat]);
      }
      emailCtrl.updateValueAndValidity();
      cellphoneCtrl.updateValueAndValidity();
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
