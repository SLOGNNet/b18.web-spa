import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load } from '../../../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';

@Component({
  selector: 'expanded-load-view',
  templateUrl: './expanded-load-view.component.html',
  styleUrls: ['./expanded-load-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandedLoadViewComponent {
  @Input() load: Load;
}
