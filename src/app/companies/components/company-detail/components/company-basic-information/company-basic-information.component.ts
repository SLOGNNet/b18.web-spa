import { Component, Input } from '@angular/core';
import { Company, CompanyTypes } from '../../../../../models';

@Component({
  selector: 'company-basic-information',
  templateUrl: './company-basic-information.component.html',
  styleUrls: ['./company-basic-information.component.scss'],
})
export class CompanyBasicInformation {
  @Input() company: Company;
  croppedCompanyName: string;
  typeText: string;

  ngOnChanges(changes) {
    if(changes.company) {
      this.croppedCompanyName = this.company.name.replace(/ /g, '').substr(0, 3).toUpperCase();
      this.typeText = Company.getTypeText(this.company.type);
    }
  }

}
