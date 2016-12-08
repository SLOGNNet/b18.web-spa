import { Component, Input } from '@angular/core';
import { ViewMode } from '../../enums';
@Component({
  selector: 'bd-form-section',
  templateUrl: './bd-form-section.component.html'
})
export class BdFormSectionComponent {

  @Input() labelText: string;
  @Input() viewMode: ViewMode = ViewMode.Edit;

  private get isLabelVisisble() {
    return this.viewMode === ViewMode.Edit;
  }
}
