import { Component, Input } from '@angular/core';
import { Load, Trip, StopTypes, Commodity, AppointmentTypes, Appointment, TripStop, StopActionTypes } from '../../../../../models';

@Component({
  selector: 'commodity-details',
  templateUrl: './commodity-details.component.html',
  styleUrls: ['./commodity-details.component.scss']
})
export class CommodityDetailsComponent {
  @Input() index: number;
  @Input() commodity: Commodity;

  public columns: Array<any> = [];

  getCommodityColumns(commodity: Commodity) {
    let result = [];
        result.push(commodity.po, commodity.commodity, commodity.unitType, commodity.unitCount, commodity.palletCount, commodity.weight);
    return result;
  }
  ngOnInit() {
    this.index++;
    this.columns = this.getCommodityColumns(this.commodity);
  }
}
