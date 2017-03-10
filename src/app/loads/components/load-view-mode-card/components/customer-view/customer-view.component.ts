import { Component, Input } from '@angular/core';
import { Load, Trip, StopTypes, Commodity, AppointmentTypes, Appointment, TripStop, Company } from '../../../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';

@Component({
  selector: 'customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent {
  @Input() company: Company;

  private companyNameSplitted: Array<string> = [];

  ngOnInit() {
   this.companyNameSplitted = this.company.name.split('');
  }
}
