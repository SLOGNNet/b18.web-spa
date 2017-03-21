import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Load, FreightType } from '../../../../../models';


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
    return Load.getDriverRequirement(this.load.driverRequirment);
  }

  get requiredPowerUnitType() {
    return Load.getPowerUnitType(this.load.requiredPowerUnitType);
  }

  get requiredTrailerType() {
    return Load.getTrailerType(this.load.requiredTrailerType);
  }


}
