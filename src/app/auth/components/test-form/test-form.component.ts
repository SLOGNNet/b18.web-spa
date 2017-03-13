import { Component, ElementRef, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseForm } from '../../../forms';
import { AuthenticationService } from '../../services';

@Component(Object.assign({
  selector: 'bd-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss', '../../components/auth-wrapper/spinner.scss']
}, BaseForm.metaData))
export class TestFormComponent extends BaseForm implements OnInit {

  testForm: FormGroup;

  constructor(
    private cd: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    console.log(new Date());
    this.testForm = new FormGroup({
      date: new FormControl(new Date(), [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

}
