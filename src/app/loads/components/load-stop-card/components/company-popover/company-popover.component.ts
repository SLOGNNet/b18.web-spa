import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Company } from '../../../../../models';

@Component({
  selector: 'company-popover',
  templateUrl: './company-popover.component.html',
  styleUrls: ['./company-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyPopoverComponent {
  @Input() company: Company;

  get status() {
    return Company.getStatusText(this.company.status);
  }

  get phone() {
    return [this.company.addresses[0].phone, this.company.addresses[0].phoneExtension].filter(v => v).join(' x ');
  }
}
