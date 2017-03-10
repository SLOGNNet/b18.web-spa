import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Company, CompanyStatuses, CompanyTypes, Address, Location } from '../../models';
import { LocationActions } from '../../actions';
import { BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component(Object.assign({
  selector: 'company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
  providers: [FormValidationService]
}, BaseForm.metaData))
export class CompanyForm extends BaseForm {
  @Input() disabled: boolean = false;
  @Input() public scrollable: boolean = false;
  @Input() public submitButtonText: string = 'Save';
  @Input() public company: Company;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @select(state => state.locations.items.map(location => location.address)) addresses$: Observable<Address[]>;
  @select(state => state.locations.items) locations$: Observable<Location[]>;
  companyForm: FormGroup;
  private companyTypes: Array<any>;
  private selectedCompanyType: string;
  private companyStatuses: Array<any>;
  private selectedCompanyStatus: string;

  constructor(private formBuilder: FormBuilder,
    private locationActions: LocationActions,
    private enumHelperService: EnumHelperService,
    private cdr: ChangeDetectorRef,
    private validationService: FormValidationService,
    elementRef: ElementRef) {
    super(elementRef);
    this.companyTypes = enumHelperService.getDropdownKeyValues(CompanyTypes);
    this.companyStatuses = enumHelperService.getDropdownKeyValues(CompanyStatuses);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  submit(company: Company, isValid: boolean) {
    if (!isValid) {
      this.validationService.show();
    }

    if (company && isValid) {
      this.save.emit(company);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  initForm() {
    this.companyForm = this.formBuilder.group({
      id: [this.company.id],
      name: [this.company.name],
      type: [this.company.type],
      status: [this.company.status, Validators.required],
      mc: [this.company.mc, Validators.required],
      taxId: [this.company.taxId],
      contacts: this.formBuilder.array([]),
      locations: this.formBuilder.array([]),
      email: [this.company.email]
    });
  }

  onLocationAdd(location: Location) {
    this.locationActions.add(location);
  }

  onLocationUpdate(location: Location) {
    this.locationActions.update(location);
  }

  onLocationRemove(location: Location) {
    this.locationActions.remove(location);
  }

  private onExpandChanged(viewMode) {
    this.viewMode = viewMode;
  }
}
