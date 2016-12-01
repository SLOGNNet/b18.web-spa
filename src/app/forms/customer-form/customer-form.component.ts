import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'customer-form',
    templateUrl: './customer-form.component.html'
})
export class CustomerForm {

    customerForm: FormGroup;

     constructor(private formBuilder: FormBuilder) {

     }

     ngOnInit() {
       this.customerForm = this.formBuilder.group({
        companyName: ['', Validators.required]
      });

     }
}
