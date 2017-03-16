import { Component, Input } from '@angular/core';
import { Company } from '../../../../../models';

@Component({
  selector: 'company-basic-information',
  templateUrl: './company-basic-information.component.html',
  styleUrls: ['./company-basic-information.component.scss'],
})
export class CompanyBasicInformation {

  @Input() company: Company;

  croppedCompanyName: string;

  ngOnInit() {
    this.croppedCompanyName = this.company.name.replace(/ /g, '').substr(0, 3).toUpperCase();
  }

}
