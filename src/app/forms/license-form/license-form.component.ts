import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { License, LicenseClassTypes } from '../../models';
import { EnumHelperService } from '../../shared/helpers';
import { StateService, EndorsementService, RestrictionService } from '../../shared/services';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.scss']
}, BaseForm.metaData))
export class LicenseForm extends BaseForm {
  @Input()
  public license: License;
  @Input('group')
  public licenseForm: FormGroup;
  @Output() update = new EventEmitter();

  states: Array<any> = [];
  licenseClasses: Array<any> = [];
  endorsmentList: Array<any> = [];
  restrictionList: Array<any> = [];

  constructor(
    private _cdr: ChangeDetectorRef,
    private enumHelperService: EnumHelperService,
    private stateService: StateService,
    private endorsementService: EndorsementService,
    private restrictionService: RestrictionService,
    private _formBuilder: FormBuilder,
    element: ElementRef
  ) {
    super(element);

    this.stateService.getAll().subscribe(states => this.states = states.map(value => ({ 'key': value, 'value': value })));
    this.endorsementService.getAll().subscribe(endorsements => this.endorsmentList = endorsements);
    this.restrictionService.getAll().subscribe(restrictions => this.restrictionList = restrictions);

    this.licenseClasses = enumHelperService.getDropdownKeyValues(LicenseClassTypes);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    const fields = this._createFields();
    fields.forEach(field => {
      this.licenseForm.addControl(
        field.name,
        this._formBuilder.control(this.license[field.name], field.validators)
      );
    });
  }

  private _createFields() {
    const fields = [
      { name: 'id', validators: [] },
      { name: 'number', validators: [] },
      { name: 'expiration', validators: [] },
      { name: 'dateIssued', validators: [] },
      { name: 'stateIssued', validators: [] },
      { name: 'class', validators: [] },
      { name: 'endorsments', validators: [] },
      { name: 'restrictions', validators: [] }
    ];

    return fields;
  }
}
