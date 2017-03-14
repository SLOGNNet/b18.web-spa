import { Component, Input } from '@angular/core';
import { Load,
  Trip,
  StopTypes,
  Commodity,
  AppointmentTypes,
  Appointment,
  TripStop,
  StopActionTypes,
  StopAction,
  Stop,
  ContactInfo  } from '../../../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { CommoditiesHeaderComponent } from '../../../../forms';
import { find, map } from 'lodash';

@Component({
  selector: 'stop-view',
  templateUrl: './stop-view.component.html',
  styleUrls: ['./stop-view.component.scss']
})
export class StopViewComponent {
  @Input() stop: Stop;
  public isExpanded: boolean = false;
  public pickups: Array<any> = [];
  public dropoffs: Array<any> = [];

  private tripStops: Array<TripStop> = [];

  get isPickup() { return this.pickups.length && !this.dropoffs.length; }

  get isDropoff() { return !this.pickups.length && this.dropoffs.length; }

  get isCombined() { return this.pickups.length && this.dropoffs.length; }

  ngOnInit() {
    this.tripStops = this.stop.tripStops;
    this.tripStops.map(item => {
      map(item.stopActions, stopAction => {
          this.pickups = item.stopActions.filter(obj => obj.type === StopActionTypes.Pickup);
          this.dropoffs = item.stopActions.filter(obj => obj.type === StopActionTypes.Dropoff);
      });
    });
  }

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  getContactInfoCollection(contactItems: Array<ContactInfo>) {
    let result: Array<ContactInfo> = [];
    this.isExpanded ? result = contactItems : result.push(ContactInfo.getPrimaryPhone(contactItems));
    return result;
  }
}
