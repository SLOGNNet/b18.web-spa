import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomerService, BdFormBuilder, BdFormGroup, EnumHelperService } from '../../shared';
import { Stop, StopTypes } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'stop-form',
  styleUrls: ['stop-form.component.scss'],
  templateUrl: './stop-form.component.html'
}, BaseForm.metaData))
export class StopFormComponent extends BaseForm implements OnChanges {
  @Input('group') formGroup: FormGroup;
  @Input()
  public stop: Stop;

  private  stopTypes = StopTypes;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  private initForm() {
      this.formGroup.addControl(
        'date',
        this.formBuilder.control(this.stop['date'])
      );
      this.formGroup.addControl(
        'commodities',
        this.formBuilder.array([])
      );
      this.formGroup.addControl(
        'notes',
        this.formBuilder.control(this.stop['notes'])
      );
  }
}
