import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Load, FreightType, DriverRequirements, PowerUnitTypes, TrailerTypes } from '../../../../../models';


@Component({
  selector: 'requirements-detail',
  templateUrl: './requirements-detail.component.html',
  styleUrls: ['./requirements-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequirementsDetailComponent {
  @Input() load: Load;
  private isAdditionalRequirements: boolean = false;
  private _isReeferTrailerType: boolean = false;

  get isReeferTrailerType () {
    if (this.load.freightType === FreightType.REEFER) this._isReeferTrailerType = true;
    return this._isReeferTrailerType;
  }

  get driverRequirement() {
    return DriverRequirements.displayText(this.load.driverRequirment);
  }

  get requiredPowerUnitType() {
    return PowerUnitTypes.displayText(this.load.requiredPowerUnitType);
  }

  get requiredTrailerType() {
    return TrailerTypes.displayText(this.load.requiredTrailerType);
  }


}
