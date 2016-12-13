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
  @Input() isExpanded: boolean = false;

  private placeSource: any[];
  private placeQuery: string = '';
  private placeViewMode: ViewMode = ViewMode.View;
  private map = {
    labelText: '',
    location: {
      lat: 0,
      lng: 0
    }
  };
  private fields = [
    { name: 'phone', validators: [] },
    { name: 'fax', validators: [] },
    { name: 'state', validators: [] },
    { name: 'zip', validators: [] },
    { name: 'phoneExtension', validators: [] },
    { name: 'faxExtension', validators: [] },
    { name: 'streetAddress', validators: [] },
    { name: 'secondStreetAddress', validators: [] },
    { name: 'city', validators: [] },
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
    this._updateMap(this.address.location, this.address.streetAddress);
  }

  initForm() {
    this.fields.forEach(field => {
      this.addressForm.addControl(
        field.name,
        this.formBuilder.control(this.address[field.name], field.validators)
      );
    });
  }

  onRemoveMap() {
    this._updateMap();
  }

  public onPlaceSelect(place) {
    this.googleService.getDetails(place.place_id)
      .subscribe(detail => {
        if (detail) {
          this.placeQuery = detail.streetAddress;
          this._updateMap(detail.location, detail.streetAddress);
          this.addressForm.setValue(Object.assign({}, this.address, detail));
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

  private _updateMap(location = { lat: 0, lng: 0}, labelText = ''): void {
    this.map = {
      location,
      labelText
    };
  }
}
