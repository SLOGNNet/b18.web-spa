import { Component, ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';

@Component(Object.assign({
  selector: 'bd-register-phone-confirmation-form',
  templateUrl: './register-phone-confirmation-form.component.html',
  styleUrls: ['../../../../assets/styles/form-control.scss']
}, BaseForm.metaData))
export class RegisterPhoneConfirmationFormComponent extends BaseForm implements OnInit, OnDestroy {

  isConfirmationFailed: boolean;
  phoneForm: FormGroup;
  isLoading: boolean = false;
  errorDescription: string;
  private subscription: any;
  private invitationToken: string;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.invitationToken = params['invitationToken'];
    });
    this.phoneForm = new FormGroup({
      code: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.authenticationService.signUpConfirmPhone(this.invitationToken, form.value.code).subscribe(
      response => {
        this.isLoading = false;
      },
      error => {
        this.errorDescription = error.description || error.message;
        this.isConfirmationFailed = true;
        this.phoneForm.markAsPristine();
        this.cd.markForCheck();
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
