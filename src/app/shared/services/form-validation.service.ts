import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FormValidationService {
    public showValidation: Observable<void>;
    private showValidationSubject: Subject<void>;

    constructor() {
      this.showValidationSubject = new Subject<void>();
      this.showValidation  = this.showValidationSubject.asObservable();
    }
    show() {
      this.showValidationSubject.next();
    }
}
