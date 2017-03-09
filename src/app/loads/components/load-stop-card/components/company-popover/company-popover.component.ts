import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Company, Location, ContactInfo } from '../../../../../models';

@Component({
  selector: 'company-popover',
  templateUrl: './company-popover.component.html',
  styleUrls: ['./company-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyPopoverComponent {
  @Input() company: Company;
  @Input() companyLocation: Location;
  @Input() companyBillingLocation: Location;

  get status() {
    return Company.getStatusText(this.company.status);
  }

  get phone() {
    return ContactInfo.getPrimaryPhone(this.companyLocation.contactInfo);
  }
}
