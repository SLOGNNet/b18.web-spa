import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services';

@Component({
  selector: 'bd-register-email-confirmation',
  templateUrl: './register-email-confirmation.component.html'
})

export class RegisterEmailConfirmationComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  isConfirmationFailed: boolean = false;
  private subscription: any;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.isLoading = true;
      this.authenticationService.signUpConfirmEmail(params).subscribe(
        response => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.isConfirmationFailed = true;
        }
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
