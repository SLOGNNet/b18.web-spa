import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load } from '../../../models';
import { BdInitialsCircleComponent } from './common/bd-icons/bd-initials-circle';
import { CollapseModule, CollapseDirective } from 'ng2-bootstrap/components/collapse';

@Component({
  selector: 'load-view-mode-card',
  templateUrl: './load-view-mode-card.component.html',
  styleUrls: ['./load-view-mode-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadViewModeCardComponent {
  @Input() load: Load;

    public isCollapsed: boolean = false;

    public collapsed(event: any): void {
      console.log(event);
    }

    public expanded(event: any): void {
      console.log(event);
    }
}
