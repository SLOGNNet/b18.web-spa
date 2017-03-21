import { Component, Input } from '@angular/core';
import { Driver, DriverPaymentOptions } from '../../../../../models';

@Component({
  selector: 'driver-payment-type',
  templateUrl: './driver-payment-type.component.html',
  styleUrls: ['./driver-payment-type.component.scss']
})
export class DriverPaymentTypeComponent {
  @Input() driver: Driver;

  get paymentTypeText() {
    return Driver.getPaymentTypeText(this.driver.paymentOptions);
  }

  get paymentTypeIcon() {
    return this.driver.paymentOptions === DriverPaymentOptions.PERCENTAGE ? '%' : '$';
  }
}
