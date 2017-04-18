import { Component, Input, Output, OnChanges, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CompanyService, ContactService, LocationService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import { Load, Company, CompanyStatuses, CompanyTypes } from '../../models';
import { BaseForm } from '../base-form';
import { ViewMode } from '../../shared/enums';

@Component(Object.assign({
  selector: 'load-company-form',
  styleUrls: ['load-company-form.component.scss'],
  templateUrl: './load-company-form.component.html',
  changeDetectionStrategy: ChangeDetectionStrategy.OnPush
}, BaseForm.metaData))
export class LoadCompanyFormComponent extends BaseForm implements OnChanges {
  customerLocations: Array<any>;
  contacts: Array<any>;
  customerSource: any[];
  customerQuery: string = '';
  selectedCustomer: Company = null;
  customerFormViewMode: ViewMode = ViewMode.ViewCollapsed;
  customerTypes: Array<string>;
  customerStatuses: Array<string>;
  @Input() public isLoading: boolean = false;
  @Input() load: Load;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() addStop: EventEmitter<any> = new EventEmitter();
  public loadForm: FormGroup = this.formBuilder.group({});
  private fields = [
    { name: 'id', validators: [] },
    { name: 'companyId', validators: [] },
    { name: 'customer', validators: [] },
    { name: 'customerLocationId', validators: [] },
    { name: 'customerLocation', validators: [] },
    { name: 'customerBillingLocationId', validators: [] },
    { name: 'customerBillingLocation', validators: [] },
    { name: 'contactId', validators: [] },
  ];

  public constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private enumHelperService: EnumHelperService,
    elementRef: ElementRef) {
    super(elementRef);

    this.customerTypes = this.enumHelperService.getDropdownKeyValues(CompanyTypes);
    this.customerStatuses = this.enumHelperService.getDropdownKeyValues(CompanyStatuses);
  }

  ngOnChanges(changes: any) {
    if (changes.load) {
      this.selectedCustomer = changes.load.currentValue.customer || Company.create();
      this.initForm();
      this.initCustomerForm(this.selectedCustomer);
      this.initCustomerTypeahead(changes.load.currentValue);
      this.initDropdowns(this.selectedCustomer);
    }
  }

  public initForm() {
    this.fields.forEach(field => {
      this.loadForm.setControl(
        field.name,
        this.formBuilder.control({ value: this.load[field.name], disabled: false }, field.validators)
      );
    });
  }

  private initCustomerForm(customer) {
    this.loadForm.setControl(
      'customerForm',
      this.formBuilder.group({
        type: [{ value: customer.type, disabled: true }],
        status: [{ value: customer.status, disabled: false }],
        mc: [{ value: customer.mc, disabled: true }]
      })
    );
  }

  private initCustomerTypeahead(load) {
    this.customerQuery = load.customer && load.customer.name;
    this.customerSource = Observable.create((observer: any) => {
      observer.next(this.customerQuery);
    }).mergeMap((token: string) => this.companyService.search(token));
  }

  private initDropdowns(customer) {
    this.customerLocations = customer ? customer.locations : [];
    this.contacts = customer ? customer.contacts : [];
  }

  private onLocationSelect(data) {
    this.loadForm.setControl('customerLocation', this.formBuilder.control({ value: data.item, disabled: false }));
  }

  private onBillingLocationSelect(data) {
    this.loadForm.setControl('customerBillingLocation', this.formBuilder.control({ value: data.item, disabled: false }));
  }

  private onCustomerSelect(customer: Company) {
    this.selectedCustomer = customer;
    this.loadForm.setControl('customer', this.formBuilder.control({ value: customer || {}, disabled: false }));
    this.onLocationSelect({});
    this.onBillingLocationSelect({});
    this.initDropdowns(customer);
    this.initCustomerForm(customer || {});
  }

  private onCustomerRemove() {
    this.onCustomerSelect(null);
  }

  private onAddCustomer() {

  }

  private onLoadCancel() {
    this.cancel.emit();
  }

  private onLoadSave() {
    if (this.loadForm.valid) {
      let result = this.loadForm.value;
      result.customer = Object.assign({}, result.customer, result.customerForm);
      delete result.customerForm;
      this.save.emit(this.loadForm.value);
    }
  }

  private onAddStop() {
    this.addStop.emit();
  }

  private onExpandChanged(isExpanded) {
    this.customerFormViewMode = isExpanded;
  }

  private get isCustomerFormExpanded(): boolean {
    return this.customerFormViewMode !== ViewMode.ViewCollapsed;
  }
}
