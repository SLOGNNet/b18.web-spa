import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewMode } from '../../enums';

@Component({
  selector: 'view-mode-toogle',
  styleUrls: ['./view-mode-toogle.component.scss'],
  templateUrl: './view-mode-toogle.component.html'
})
export class ViewModeToogleComponent {
  @Output() changed = new EventEmitter();
  @Input() viewMode: ViewMode = ViewMode.Edit;

  private get editMode() {
    return this.viewMode === ViewMode.Edit;
  }
  toggleViewMode(){
    this.viewMode = this.editMode ? ViewMode.View : ViewMode.Edit;
    this.changed.emit(this.viewMode);
  }
}
