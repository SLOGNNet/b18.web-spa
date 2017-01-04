import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Validators } from '@angular/forms';
import { Address } from '../../models';
import { ViewMode } from '../../shared/enums';
import { BdFormGroup, BdFormBuilder, GoogleService } from '../../shared';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
}, BaseForm.metaData))
export class AddressForm extends BaseForm {
  @Input()
  public address: Address;
  @Input('group')
  public addressForm: BdFormGroup;
  @Output() update = new EventEmitter();
  private _placeSource: any[];
  private _placeQuery: string = '';
  private _map = {
    labelText: '',
    location: {
      lat: 0,
      lng: 0
    }
  };
  private fields = [
    { name: 'id', validators: [] },
    { name: 'name', validators: [Validators.required] },
    { name: 'phone', validators: [Validators.required] },
    { name: 'fax', validators: [] },
    { name: 'state', validators: [] },
    { name: 'zip', validators: [] },
    { name: 'phoneExtension', validators: [] },
    { name: 'faxExtension', validators: [] },
    { name: 'streetAddress', validators: [Validators.required] },
    { name: 'secondStreetAddress', validators: [] },
    { name: 'city', validators: [] },
    { name: 'location', validators: [] }
  ];

  constructor(
    private _cdr: ChangeDetectorRef,
    private _formBuilder: BdFormBuilder,
    private _googleService: GoogleService) {
    super();
  }

  ngOnChanges(changes: any) {
    this.initForm();
    this._initPlaceTypeahead();
    this._updateMap(this.address.location, this.address.streetAddress);
  }

  initForm() {
    this.fields.forEach(field => {
      this.addressForm.addControl(
        field.name,
        this._formBuilder.control(this.address[field.name], field.validators)
      );
    });
      this.addressForm.valueChanges.subscribe((value) => {
        if (this.addressForm.valid) {
           this.update.emit(value);
        }
      });
  }

  onRemoveMap() {
    this._updateMap();
  }

  onAddressRemove() {
    this.addressForm.setValue(Object.assign(
      {},
      this.addressForm.value,
      {
        city: '',
        state: '',
        zip: '',
        secondStreetAddress: '',
        location: {
          lat: 0,
          lng: 0
        }
      }
    ));

    this._updateMap();
  }

  public onPlaceSelect(place) {
    if (place && typeof place.place_id === 'string') {
      this._googleService.getDetails(place.place_id)
        .subscribe(detail => {
          if (detail) {
            this._placeQuery = detail.streetAddress;
            this._updateMap(detail.location, detail.streetAddress);
            this.addressForm.setValue(Object.assign({}, this.addressForm.value, detail));
            this._cdr.markForCheck();
          }
        });
    }
  }

  private _initPlaceTypeahead() {
    this._placeQuery = this.address.streetAddress;

    this._placeSource = Observable.create((observer: any) => {
      observer.next(this._placeQuery);
    }).mergeMap((token: string) => this._googleService.getPredictions(token));
  }

  private _updateMap(location = { lat: 0, lng: 0 }, labelText = ''): void {
    this._map = {
      location,
      labelText
    };
  }
}
