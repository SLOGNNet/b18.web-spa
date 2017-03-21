import { Component, ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';

@Component(Object.assign({
  selector: 'bd-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['../../../../assets/styles/form-control.scss']
}, BaseForm.metaData))
export class NewPasswordFormComponent extends BaseForm implements OnInit, OnDestroy {

  newPasswordForm: FormGroup;
  isLoading: boolean = false;
  isRequestFailed: boolean;
  errorDescription: string;
  private subscription: any;
  private recoveryToken: string;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.recoveryToken = params['recoveryToken'];
    });
    this.newPasswordForm = new FormGroup({
      password: new FormControl('',  [Validators.required]),
      retryPassword: new FormControl('',  [Validators.required])
    }, this.matchingPasswords('password', 'retryPassword'));
  }

  onSubmit(form: FormGroup) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.authenticationService.newPassword(this.recoveryToken, form.value).subscribe(
      response => {
        this.isLoading = false;
      },
      error => {
        this.errorDescription = error.description || error.message;
        this.isRequestFailed = true;
        this.newPasswordForm.markAsPristine();
        this.cd.markForCheck();
        this.isLoading = false;
      }
    );
  }

  matchingPasswords(passwordKey: string, retryPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let retryPassword = group.controls[retryPasswordKey];
      if (password.value !== retryPassword.value) {
        return {passwordsNotMatch: true};
      }
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
