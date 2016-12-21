import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewMode } from '../../enums';

@Component({
  selector: 'bd-form-expand',
  styleUrls: ['./bd-form-expand.component.scss'],
  templateUrl: './bd-form-expand.component.html'
})
export class BdFormExpandComponent {
  @Output() changed = new EventEmitter();
  @Input() viewMode: ViewMode = ViewMode.View;

  private get isExpandButtonVisible(): boolean {
    return this.viewMode !== ViewMode.Edit;
  }

  private get isExpanded(): boolean {
    return this.viewMode !== ViewMode.ViewCollapsed;
  }

  toggleExpand(){
    this.viewMode = this.isExpanded ? ViewMode.ViewCollapsed : ViewMode.View;
    this.changed.emit(this.viewMode);
  }
}
