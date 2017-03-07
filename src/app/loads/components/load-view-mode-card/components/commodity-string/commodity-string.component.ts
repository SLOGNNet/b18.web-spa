import { Component, Input } from '@angular/core';
import { Load, Trip, StopTypes, Commodity, AppointmentTypes, Appointment, TripStop, StopActionTypes } from '../../../../../models';

@Component({
  selector: 'commodity-string',
  templateUrl: './commodity-string.component.html',
  styleUrls: ['./commodity-string.component.scss']
})
export class CommodityStringComponent {
  @Input() index: number;
  @Input() commodity: Commodity;

  public items: Array<any> = [];

  getCommodityItems(commodity: Commodity) {
    let result = [];
        result.push(commodity.po, commodity.commodity, commodity.unitType, commodity.unitCount, commodity.palletCount, commodity.weight);
    return result;
  }
  ngOnInit() {
    this.index++;
    this.items = this.getCommodityItems(this.commodity);
  }
}
