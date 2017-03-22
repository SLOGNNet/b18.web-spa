import { Component, Input } from '@angular/core';
import { Driver, DriverPaymentOptions } from '../../../../../models';

@Component({
  selector: 'driver-payment-type',
  templateUrl: './driver-payment-type.component.html',
  styleUrls: ['./driver-payment-type.component.scss']
})
export class DriverPaymentOptionComponent {
  @Input() driver: Driver;

  get paymentOptionText() {
    return Driver.getPaymentOptionText(this.driver.paymentOption);
  }

  get paymentOptionIcon() {
    return this.driver.paymentOption === DriverPaymentOptions.PERCENTAGE ? '%' : '$';
  }
}
