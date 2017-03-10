import { Component, Input } from '@angular/core';
import { Load, Trip, StopTypes, Commodity, AppointmentTypes, Appointment, TripStop, Company } from '../../../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  @Input() company: Company;

  private companyNameSplitted: Array<string> = [];

  ngOnInit() {
   this.companyNameSplitted = this.company.name.split('');
  }
}
