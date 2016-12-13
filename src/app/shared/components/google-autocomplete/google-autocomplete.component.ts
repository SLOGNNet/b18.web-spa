import { Component, ViewEncapsulation, forwardRef, Optional, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { BdInputComponent } from './bd-input/bd-input.component';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ViewMode } from '../../enums';
import { GoogleService } from '../../../shared';
import { Observable } from 'rxjs/Observable';


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

    constructor( @Optional() ngControl: NgControl,
        private customerService: GoogleService) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }


    private customerSource: any[];
    private customerQuery: string = '';
    private customerViewMode: ViewMode = ViewMode.View;

    onRemove() {
        this.value = null;
    }

    ngOnChanges(changes: any) {
        debugger;
        if (changes) {
            this.initCustomerTypeahead();
        }
    }
    public onCustomerSelect(customer) {
        this.value = customer;
        this.customerViewMode = ViewMode.View;
    }

    public customerViewModeChanged(viewMode) {
        this.customerViewMode = viewMode;
    }

    private initCustomerTypeahead() {
        // this.customerSource = Observable.create((observer: any) => {
        //     //   observer.next(this.value);
        //     var service = new google.maps.places.AutocompleteService();
        //     service.getQueryPredictions({ input: this.customerQuery }, data => observer.next(data));
        // });
        this.customerSource = Observable.create((observer: any) => {
            debugger;
            observer.next(this.customerQuery);
        }).mergeMap((token: string) => this.customerService.search(token));
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
