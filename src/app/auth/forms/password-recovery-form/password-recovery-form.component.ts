import { Component, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';
import { EmailValidator, PhoneValidator } from '../../../shared/validators';
import { Constants } from '../../../shared';

@Component(Object.assign({
  selector: 'bd-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['../../../../assets/styles/form-control.scss']
}, BaseForm.metaData))
export class PasswordRecoveryFormComponent extends BaseForm implements OnInit {

  isRecoveryFailed: boolean;
  isLoading: boolean = false;
  passwordRecoveryForm: FormGroup;
  errorDescription: string;

  constructor(
    private cd: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private constants: Constants,
    element: ElementRef)
  {
    super(element);
  }

  ngOnInit() {
    this.passwordRecoveryForm = new FormGroup({
      userNameType: new FormControl(this.constants.USER_NAME_TYPES[0].key, [Validators.required]),
      email: new FormControl('',  [Validators.required, EmailValidator.isValidMailFormat]),
      cellphone: new FormControl('')
    });
    this.subscribeTypeChanges();
  }

  subscribeTypeChanges() {
    const typeCtrl = (<any>this.passwordRecoveryForm).controls.userNameType;
    const emailCtrl = (<any>this.passwordRecoveryForm).controls.email;
    const cellphoneCtrl = (<any>this.passwordRecoveryForm).controls.cellphone;
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

  onSubmit(form: FormGroup) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.authenticationService.passwordRecoveryGetRecoveryInstructions(form.value).subscribe(
      response => {
        this.isLoading = false;
      },
      error => {
        this.errorDescription = error.description || error.message;
        this.isRecoveryFailed = true;
        this.passwordRecoveryForm.markAsPristine();
        this.cd.markForCheck();
        this.isLoading = false;
      }
    );
  }

}
