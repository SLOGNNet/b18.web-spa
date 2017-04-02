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
  croppedCompanyName: string;

  ngOnInit() {
    debugger;
    this.croppedCompanyName = this.item.name.replace(/ /g, '').substr(0, 3).toUpperCase();
  }

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
    const phoneInfo = ContactInfo.getPrimaryPhone(this.item.contacts[0].contactInfo);
    return phoneInfo ? phoneInfo.value : '';
  }
}
