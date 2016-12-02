import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class CustomerService {

    public customers: Array<any> = [
    { id: 1, name: 'ARP Logistic INC', address: 'New-York', number: '423466'},
    { id: 2, name: 'DNS Logistic Corp', address: 'Chicago', number: '889065' },
    { id: 3, name: 'Purum Company', address: 'California', number: '254785' },
    { id: 4, name: 'Approximately', address: 'Kiev', number: '456887' },
    { id: 5, name: 'Satisfying company', address: 'Warsaw', number: '123452' },
    { id: 6, name: 'Dido & CO', address: 'Paris', number: '342903' },
    { id: 7, name: 'Tydysh-tydysh', address: 'Berlin', number: '678904' },
    { id: 8, name: 'Umpa Lumpa INC', address: 'Madrid', number: '341112' },
    { id: 9, name: 'Public Enemy', address: 'Rome', number: '789009' },
    { id: 10, name: 'Keep calm man)', address: 'Cape-town', number: '566003' }];

    constructor() {

    }

    public getCustomersCollection(): any[] {
        return this.customers;
    }
}
