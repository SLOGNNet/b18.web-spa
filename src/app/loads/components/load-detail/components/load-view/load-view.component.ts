import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Load, FreightType, LoadType } from '../../../../../models';

@Component({
  selector: 'load-view',
  templateUrl: './load-view.component.html',
  styleUrls: ['./load-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadViewComponent {
  @Input() load: Load;

  get type() {
    return LoadType.displayText(this.load.type);
  }

  get freightType() {
    return FreightType.displayText(this.load.freightType);
  }
}
