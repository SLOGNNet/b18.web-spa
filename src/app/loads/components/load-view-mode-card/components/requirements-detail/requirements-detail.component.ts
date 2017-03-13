import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load, DriverRequirements, FreightType, PowerUnitTypes, TrailerTypes } from '../../../../../models';


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

  ngOnInit() {
    if (this.load.freightType === FreightType.Reefer) this._isReeferTrailerType = true;
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
