import { Injectable } from '@angular/core';
import { CustomerService } from '../shared';
import { Customer } from '../models';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Todo } from '../Todo';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class CustomerStore {

    private _customers: BehaviorSubject<List<Customer>> = new BehaviorSubject(List([]));

    constructor(private customerService: CustomerService) {
    }

    get customers() {
        return  Observable.of(this._customers);
    }
}
