import { Component, ViewEncapsulation, forwardRef, Optional, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { BdInputComponent } from './bd-input/bd-input.component';
import { ControlValueAccessor, NgControl } from '@angular/forms';

declare var google: any;
const noop = () => { };

@Component({
    selector: 'google-autocomplete',
    templateUrl: './google-autocomplete.component.html',
    styleUrls: ['google-autocomplete.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GoogleAutocompleteComponent implements ControlValueAccessor {
    @ViewChild('bdinput') bdinput;

    @Input() placeholder: string;
    @Input() value: string;

    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() valueChange = new EventEmitter();

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;
    private _autocomplete;

    constructor( @Optional() ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit() {
        setTimeout(() => {
            const input = document.getElementById(this.bdinput.inputId);
            this._autocomplete = new google.maps.places.Autocomplete(input);

            this._autocomplete.addListener('place_changed', () => this.selectValue());
        }, 0);
    }

    selectValue() {
        const place = this._autocomplete.getPlace();

        if (!place.geometry) {
            return;
        }

        const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }

        const placeInfo = this.getPlaceInfo(place.address_components);

        const info = {
            zip: placeInfo.zip,
            city: placeInfo.locality,
            streetSumber: placeInfo.street_number,
            state: placeInfo.administrative_area_level_1,
            streetAddress: `${placeInfo.route} ${placeInfo.locality}`
        }

        this.onSelect.emit({ location, info });
        this.value = info.streetAddress;
        this._onChangeCallback(this.value);
    }

    getPlaceInfo(address) {
        let info = {
            zip: '',
            city: '',
            route: '',
            locality: '',
            street_number: '',
            administrative_area_level_1: ''
        };

        for (var i = 0; i < address.length; i++) {
            var addressType = address[i].types[0];
            info[addressType] = address[i].short_name
        }

        return info
    }

    changeValue(v: any) {
        this.value = v;
        // fire change callback only for selected from list items
        // if user change input value - consider it as empty result
        this._onChangeCallback(undefined);
        this.valueChange.emit(v);
    }

    writeValue(value: any) {
        this.value = value;
    }

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }
}
