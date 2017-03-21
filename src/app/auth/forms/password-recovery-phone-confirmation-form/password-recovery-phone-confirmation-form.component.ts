import { Component, ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';

@Component(Object.assign({
  selector: 'bd-password-recovery-phone-confirmation-form',
  templateUrl: './password-recovery-phone-confirmation-form.component.html',
  styleUrls: ['../../../../assets/styles/form-control.scss']
}, BaseForm.metaData))
export class PasswordRecoveryPhoneConfirmationFormComponent extends BaseForm implements OnInit, OnDestroy {

  isConfirmationFailed: boolean;
  passwordRecoveryForm: FormGroup;
  isLoading: boolean = false;
  errorDescription: string;
  private subscription: any;
  private cellphoneRecoveryToken: string;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.cellphoneRecoveryToken = params['cellphoneRecoveryToken'];
    });
    this.passwordRecoveryForm = new FormGroup({
      verificationToken: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.authenticationService.passwordRecoveryPhoneConfirmation(this.cellphoneRecoveryToken, form.value.verificationToken).subscribe(
      response => {
        this.isLoading = false;
      },
      error => {
        this.errorDescription = error.description || error.message;
        this.isConfirmationFailed = true;
        this.passwordRecoveryForm.markAsPristine();
        this.cd.markForCheck();
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
