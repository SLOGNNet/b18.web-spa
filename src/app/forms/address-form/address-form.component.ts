import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Validators } from '@angular/forms';
import { Address } from '../../models';
import { ViewMode } from '../../shared/enums';
import { EnumHelperService, BdFormGroup, BdFormBuilder, GoogleService } from '../../shared';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressForm {
  @Input()
  public address: Address;

  @Input('group')
  public addressForm: BdFormGroup;

  private placeSource: any[];
  private placeQuery: string = '';
  private placeViewMode: ViewMode = ViewMode.View;
  private fields = [
    { name: 'phone', validators: [] },
    { name: 'fax', validators: [] },
    { name: 'state', validators: [] },
    { name: 'zip', validators: [] },
    { name: 'phoneExtension', validators: [] },
    { name: 'faxExtension', validators: [] },
    { name: 'streetAddress', validators: [Validators.required] },
    { name: 'secondStreetAddress', validators: [Validators.required] },
    { name: 'city', validators: [Validators.required] },
    { name: 'location', validators: [] }
  ];


  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private formBuilder: BdFormBuilder,
    private googleService: GoogleService) {
  }

  ngAfterViewInit() {
    this.changeDetectionRef.detectChanges();
  }

  ngOnChanges(changes: any) {
    this.initForm();
    this.initPlaceTypeahead();
  }

  initForm() {
    this.fields.forEach(field => {
      this.addressForm.addControl(
        field.name,
        this.formBuilder.control(this.address[field.name], field.validators)
      );
    });
  }

  onRemove() {
    this.address.location = { lat: 0, lng: 0 };
  }

  public onPlaceSelect(place) {
    this.googleService.getDetails(place.place_id)
      .subscribe(detail => {
        if (detail) {
            this.address = Object.assign({}, this.address, detail);
            this.placeQuery = this.address.streetAddress;
            this.changeDetectionRef.detectChanges();
        }
      });

    this.placeViewMode = ViewMode.View;
  }

  public placeViewModeChanged(viewMode) {
    this.placeViewMode = viewMode;
  }

  private initPlaceTypeahead() {
    this.placeQuery = this.address.streetAddress;

    this.placeSource = Observable.create((observer: any) => {
      observer.next(this.placeQuery);
    }).mergeMap((token: string) => this.googleService.getPredictions(token));
  }
}
