import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../../models';
import { Load, LoadStatuses } from '../../../models';

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

  loadStatusColor(status: LoadStatuses): string {
    return Load.getStatusColor(status);
  }

  get customerStatusText(): string {
    return Customer.getStatusText(this.customer.status);
  }

  get customerStatusColor(): string {
    return Customer.getStatusColor(this.customer.status);
  }

  onClick() {
    this.select.emit(this.customer);
  }

}
