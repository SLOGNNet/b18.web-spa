import { Component, Input } from '@angular/core';
import { Mileage } from '../../../../../models';
import { Constants } from '../../../../../shared';

@Component({
  selector: 'equipment-mileage',
  templateUrl: './equipment-mileage.component.html',
  styleUrls: ['./equipment-mileage.component.scss'],
})
export class EquipmentMileageComponent {
  @Input() mileages: Array<Mileage>;
  @Input() showAll: Boolean;

  shownMileages: Array<Mileage>;

  constructor(private constants: Constants) {}

  ngOnChanges(showAll: Boolean) {
    this.shownMileages = this.showAll ? this.mileages.slice() : this.mileages.slice(0, 3);
  }

}
