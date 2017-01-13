import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Customer } from '../../../../../models';

@Component({
  selector: 'customer-popover',
  templateUrl: './customer-popover.component.html',
  styleUrls: ['./customer-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerPopoverComponent {
  @Input() customer: Customer;
}
