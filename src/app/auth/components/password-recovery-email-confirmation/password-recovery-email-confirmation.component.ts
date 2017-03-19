import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services';

@Component({
  selector: 'bd-password-recovery-email-confirmation',
  templateUrl: './password-recovery-email-confirmation.component.html'
})

export class PasswordRecoveryEmailConfirmationComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  isConfirmationFailed: boolean = false;
  errorDescription: string;
  private subscription: any;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.isLoading = true;
      this.authenticationService.passwordRecoveryConfirmEmail(params).subscribe(
        response => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.isConfirmationFailed = true;
          this.errorDescription = error.description || error.message;
          this.cd.markForCheck();
        }
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
