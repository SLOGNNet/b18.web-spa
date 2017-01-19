import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../../models';
import { Load } from '../../../models';

@Component({
  selector: 'customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent {
  @Input() customer: Customer;
  @Output() select: EventEmitter<any> = new EventEmitter();
  customerName: string;
  croppedCustomerName: string;

  ngOnInit() {
     this.customerName = this.customer.name;
     this.customerName = this.customerName.replace(/ /g, '');
     this.croppedCustomerName = this.customerName.substr(0, 3).toUpperCase();
  }

  loadStatusColor(status) {
    return Load.getStatusColor(status);
  }

  get customerStatusText() {
    return Customer.getStatusText(this.customer.status);
  }

  get customerStatusColor() {
    return Customer.getStatusColor(this.customer.status);
  }

  onClick() {
    this.select.emit(this.customer);
  }

}
