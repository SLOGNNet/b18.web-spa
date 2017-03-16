import { Component, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';

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
    element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    this.passwordRecoveryForm = new FormGroup({
      username: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.authenticationService.passwordRecovery(form.value).subscribe(
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
