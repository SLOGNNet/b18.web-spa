import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';

@Component(Object.assign({
  selector: 'bd-phone-confirmation-form',
  templateUrl: './phone-confirmation-form.component.html',
  styleUrls: ['./phone-confirmation-form.component.scss']
}, BaseForm.metaData))
export class PhoneConfirmationFormComponent extends BaseForm implements OnInit {

  phoneForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    this.phoneForm = new FormGroup({
      code: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
  }

}
