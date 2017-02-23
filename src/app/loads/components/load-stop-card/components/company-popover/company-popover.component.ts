import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Company, Address } from '../../../../../models';

@Component({
  selector: 'company-popover',
  templateUrl: './company-popover.component.html',
  styleUrls: ['./company-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyPopoverComponent {
  @Input() company: Company;
  @Input() companyAddress: Address;
  @Input() companyBillingAddress: Address;

  get status() {
    return Company.getStatusText(this.company.status);
  }

  get phone() {
    return [this.companyAddress.phone, this.companyAddress.phoneExtension].filter(v => v).join(' x ');
  }
}
