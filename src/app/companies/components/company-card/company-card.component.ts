import { Component } from '@angular/core';
import { Company, ContactInfo, CompanyStatuses } from '../../../models';
import { Load, LoadStatuses } from '../../../models';
import { BaseCardComponent } from '../../../base';

@Component({
  selector: 'company-card',
  templateUrl: './company-card.component.html',
  styleUrls: [
    './company-card.component.scss',
    '../../../base/base-card/base-card.component.scss'
  ]
})
export class CompanyCardComponent extends BaseCardComponent {

  loadStatusColor(status: LoadStatuses): string {
    return LoadStatuses.color(status);
  }

  itemStatusText() {
    return CompanyStatuses.displayText(this.item.status);
  }

  itemStatusColor(): string {
    return CompanyStatuses.color(this.item.status);
  }

  get phone() {
    const firstContact = this.item.contacts[0];
    const phoneInfo = firstContact && ContactInfo.getPrimaryPhone(firstContact.contactInfo);
    return phoneInfo ? phoneInfo.value : '';
  }
}
