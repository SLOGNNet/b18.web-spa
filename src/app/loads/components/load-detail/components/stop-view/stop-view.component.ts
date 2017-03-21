import { Component, Input } from '@angular/core';
import {
  TripStop,
  StopActionTypes,
  Stop,
  ContactInfo  } from '../../../../../models';
import { map } from 'lodash';

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
          this.pickups = item.stopActions.filter(obj => obj.type === StopActionTypes.PICKUP);
          this.dropoffs = item.stopActions.filter(obj => obj.type === StopActionTypes.DROPOFF);
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
