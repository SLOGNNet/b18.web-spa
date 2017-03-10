import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ViewMode } from '../../enums';
import { ExpandablePanelComponent } from '../expandable-panel';
@Component({
  selector: 'bd-form-section',
  templateUrl: './bd-form-section.component.html',
  styleUrls: ['./bd-form-section.component.scss']
})
export class BdFormSectionComponent {
  @Input() disabled: boolean = false;
  @Input() labelText: string;
  @Input() isExpanded: boolean = true;
  @Input() isExpandable: boolean = false;
  @Output() expandChange: EventEmitter<any> = new EventEmitter();



  private get isLabelVisisble() {
    return this.isExpanded && this.labelText;
  }
}
