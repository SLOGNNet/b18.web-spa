import { Component, Input } from '@angular/core';
import { Location } from '../../../../../models';

@Component({
  selector: 'company-address',
  templateUrl: './company-address.component.html',
  styleUrls: ['./company-address.component.scss'],
})
export class CompanyAddress {
  @Input() location: Location;
  streetAddress: string;

  ngOnChanges(changes) {
    if (changes.location) {
      const stateAndZip = [this.location.address.state, this.location.address.zip].filter(v => v).join(' ').trim();
      this.streetAddress = [
        this.location.address.streetAddress1,
        this.location.address.streetAddress2,
        this.location.address.city, stateAndZip].filter(v => v).join(', ');
    }
  }

}
