import { Input, Output } from '@angular/core';
import { ViewMode } from '../../shared/enums';

export class BaseForm {
    @Input() public viewMode: ViewMode = ViewMode.View;

    public get isEditMode(): boolean {
      return this.viewMode === ViewMode.Edit;
    }
}
