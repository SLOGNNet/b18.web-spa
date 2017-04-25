import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Commodity } from '../../../../../models';

@Component({
  selector: 'commodity-details',
  templateUrl: './commodity-details.component.html',
  styleUrls: ['./commodity-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  isDisabled(e) {
    const element = document.getElementById(e);

    if (!element) return false;

    return element.scrollWidth === element.clientWidth;
  }
}
