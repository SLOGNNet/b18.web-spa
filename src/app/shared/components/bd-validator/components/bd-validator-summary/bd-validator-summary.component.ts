import { Component, Input, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { BdValidatorComponent } from '../bd-validator';
@Component({
  selector: 'bd-validator-summary',
  styleUrls: ['./bd-validator-summary.component.scss'],
  templateUrl: './bd-validator-summary.component.html',
})
export class BdValidatorSummaryComponent {
  @ContentChildren(forwardRef(() => BdValidatorComponent)) validators: QueryList<BdValidatorComponent>;

  public get messages() {
    return this.validators ? this.validators.map(v => v.errorMessage).filter(m => m) : [];
  }
}
