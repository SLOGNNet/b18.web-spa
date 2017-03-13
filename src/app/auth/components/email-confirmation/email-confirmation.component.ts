import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services';

@Component({
  selector: 'bd-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss', '../auth-wrapper/spinner.scss']
})

export class EmailConfirmationComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  isConfirmationFailed: boolean = false;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.isLoading = true;
      this.authenticationService.confirmEmail(params).subscribe(
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
    this.sub.unsubscribe();
  }
}
