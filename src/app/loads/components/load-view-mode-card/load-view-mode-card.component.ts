import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load, Stop, ContactInfo, TripStop, Address, StopActionTypes } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { CommoditiesHeaderComponent } from '../../../forms';
import MockData from '../../../shared/services/data-services/mock-data';
import { find, map } from 'lodash';

@Component({
  selector: 'load-view-mode-card',
  templateUrl: './load-view-mode-card.component.html',
  styleUrls: ['./load-view-mode-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadViewModeCardComponent {
  @Input() stop: Stop = MockData.loads[0].stops[0];
  public isExpanded: boolean = false;
  public pickups: Array<any> = [];
  public dropoffs: Array<any> = [];

  private tripStops: Array<TripStop> = [];

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
