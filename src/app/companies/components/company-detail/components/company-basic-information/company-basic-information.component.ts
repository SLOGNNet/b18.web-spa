import { Component, Input } from '@angular/core';
import { Company, CompanyTypes } from '../../../../../models';

@Component({
  selector: 'company-basic-information',
  templateUrl: './company-basic-information.component.html',
  styleUrls: ['./company-basic-information.component.scss'],
})
export class CompanyBasicInformation {
  @Input() company: Company;
  typeText: string;

  ngOnChanges(changes) {
    if (changes.company) {
      this.typeText = CompanyTypes.displayText(this.company.type);
    }
  }

}
