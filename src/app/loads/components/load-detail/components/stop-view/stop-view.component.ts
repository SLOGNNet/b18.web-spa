import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() mode: 'load' | 'trip' = 'load';
  @Output() remove = new EventEmitter();
  @Output() edit = new EventEmitter();
  public isExpanded: boolean = false;
  public pickups: Array<any> = [];
  public dropoffs: Array<any> = [];

  private tripStops: Array<TripStop> = [];

  get isPickup() { return this.pickups.length && !this.dropoffs.length; }

  get isDropoff() { return !this.pickups.length && this.dropoffs.length; }

  get isCombined() { return this.pickups.length && this.dropoffs.length; }

  ngOnInit() {
    this.tripStops = this.stop.tripStops || [];
    this.tripStops.map(item => {
      map(item.stopActions, stopAction => {
          this.pickups = item.stopActions.filter(obj => obj.type === StopActionTypes.PICKUP);
          this.dropoffs = item.stopActions.filter(obj => obj.type === StopActionTypes.DROPOFF);
      });
    });
  }

  onExpand() {
    this.isExpanded = !this.isExpanded;
  }

  getContactInfoCollection(contactItems: Array<ContactInfo>) {
    contactItems = contactItems || [];
    const result: Array<ContactInfo> = this.isExpanded ?  contactItems : [ContactInfo.getPrimaryPhone(contactItems)];
    return result;
  }

  onEdit() {
    this.edit.emit(this.stop);
  }

  onRemove() {
    this.remove.emit(this.stop);
  }
}
