import { Component, Input } from '@angular/core';
import { ViewMode } from '../../enums';
import { ExpandablePanelComponent } from '../expandable-panel';
@Component({
  selector: 'bd-form-section',
  templateUrl: './bd-form-section.component.html',
  styleUrls: ['./bd-form-section.component.scss']
})
export class BdFormSectionComponent {

  @Input() labelText: string;
  @Input() viewMode: ViewMode = ViewMode.Edit;

  private get isLabelVisisble() {
    return this.viewMode === ViewMode.Edit;
  }
}
