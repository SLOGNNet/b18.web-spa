import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewMode } from '../../enums';

@Component({
  selector: 'bd-form-expand',
  styleUrls: ['./bd-form-expand.component.scss'],
  templateUrl: './bd-form-expand.component.html'
})
export class BdFormExpandComponent {
  @Output() changed = new EventEmitter();
  @Input() expanded: boolean = true;
  @Input() viewMode: ViewMode = ViewMode.View;

  private get isExpandButtonVisible() {
    return this.viewMode === ViewMode.View;
  }

  toggleExpand(){
    this.expanded = !this.expanded;
    this.changed.emit(this.expanded);
  }
}
