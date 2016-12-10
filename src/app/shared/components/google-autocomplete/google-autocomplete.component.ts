import { Component, ViewEncapsulation, forwardRef, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { BdInputComponent } from './bd-input/bd-input.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var google: any;
const noop = () => { };

export const GOOGLE_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GoogleAutocompleteComponent),
    multi: true
};

@Component({
    selector: 'google-autocomplete',
    templateUrl: './google-autocomplete.component.html',
    styleUrls: ['google-autocomplete.component.scss'],
    providers: [GOOGLE_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
})
export class GoogleAutocompleteComponent {
    @ViewChild('bdinput') bdinput;
    @Output() placeChanged = new EventEmitter();
    @Input() placeholder: string;
    private _onChangeCallback: (_: any) => void = noop;
    private _value: string;

    writeValue(value: any) {
        debugger;

        if (value) {
            this._value = value;
        }
    }

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn: any) {
        this._onChangeCallback = fn;
    }

    ngOnInit() {
        setTimeout(() => {
            const input = document.getElementById(this.bdinput.inputId);
            const autocomplete = new google.maps.places.Autocomplete(input, {
                types: ['geocode']
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();

                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    const location = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    }

                    const address = place.address_components;
                    let info = {
                        zip: '',
                        route: ''
                    };

                    for (var i = 0; i < address.length; i++) {
                        var addressType = address[i].types[0];
                        info[addressType] = address[i].long_name
                    }

                    this.placeChanged.emit({ location, info });
                }
            });
        }, 0);
    }
}
