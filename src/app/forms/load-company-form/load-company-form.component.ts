import { Component, Input, Output, OnChanges, EventEmitter, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CompanyService, ContactService, LocationService } from '../../shared';
import { Load, Company, CompanyStatuses, CompanyTypes } from '../../models';
import { BaseForm } from '../base-form';
import { ViewMode } from '../../shared/enums';

@Component(Object.assign({
  selector: 'load-company-form',
  styleUrls: ['load-company-form.component.scss'],
  templateUrl: './load-company-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
}, BaseForm.metaData))
export class LoadCompanyFormComponent extends BaseForm implements OnChanges {
  customerLocations: Array<any>;
  contacts: Array<any>;
  customerSource: any[];
  customerQuery: string = '';
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
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    if (changes.load) {
      const load = changes.load.currentValue;

      if (!load.customer) {
        load.customer = { };
      }
      this.initForm(load);
      this.initCustomerTypeahead(load.customer);
      this.initDropdowns(load.customer);
    }
  }

  public initForm(load) {
    this.fields.forEach(field => {
      this.loadForm.setControl(
        field.name,
        this.formBuilder.control({ value: load[field.name], disabled: false }, field.validators)
      );
    });
  }

  private initCustomerTypeahead(customer) {
    this.customerQuery = customer ? customer.name : '';
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
    this.loadForm.setControl('customer', this.formBuilder.control({ value: customer || {} , disabled: false }));
    this.onLocationSelect({});
    this.onBillingLocationSelect({});
    this.initDropdowns(customer);
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
      this.save.emit(this.loadForm.value);
    }
  }

  private onAddStop() {
    this.addStop.emit();
  }
}
