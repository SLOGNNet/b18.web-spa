import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Load, FreightType, LoadType } from '../../../../../models';
import { EnumHelperService } from '../../../../../shared/helpers';


@Component({
  selector: 'load-view',
  templateUrl: './load-view.component.html',
  styleUrls: ['./load-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadViewComponent {
  @Input() load: Load;

  constructor(private enumHelperService: EnumHelperService) {

  }

  get type() {
    return this.enumHelperService.getValueByKey(LoadType, this.load.type);
  }

  get freightType() {
    return FreightType.displayText(this.load.freightType);
  }
}
