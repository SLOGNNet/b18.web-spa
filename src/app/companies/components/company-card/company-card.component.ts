import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../models';
import { Load, LoadStatuses } from '../../../models';

@Component({
  selector: 'company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent {
  @Input() company: Company;
  @Output() select: EventEmitter<any> = new EventEmitter();
  croppedCompanyName: string;

  ngOnInit() {
     this.croppedCompanyName = this.company.name.replace(/ /g, '').substr(0, 3).toUpperCase();
  }

  loadStatusColor(status: LoadStatuses): string {
    return Load.getStatusColor(status);
  }

  get companyStatusText(): string {
    return Company.getStatusText(this.company.status);
  }

  get companyStatusColor(): string {
    return Company.getStatusColor(this.company.status);
  }

  onClick() {
    this.select.emit(this.company);
  }

}
