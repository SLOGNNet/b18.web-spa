import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-company-circle',
  styleUrls: ['./bd-company-circle.component.scss'],
  templateUrl: './bd-company-circle.component.html'
})
export class BdCompanyCircleComponent {

      @Input() companyName: string = '';
      croppedCompanyName: string;
      @Input() private size: 'default' | 'small' = 'default';

      ngOnInit() {
        this.croppedCompanyName = this.companyName.replace(/ /g, '').substr(0, 3).toUpperCase();
      }

      get companyInitials() {
        return this.croppedCompanyName;
      }
}
