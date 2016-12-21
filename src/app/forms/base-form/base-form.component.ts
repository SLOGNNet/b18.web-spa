import { Input, Output } from '@angular/core';
import { ViewMode } from '../../shared/enums';

export class BaseForm {
  public static metaData: Object = {
    inputs: ['viewMode'],
    host: {
      '[class.bd-view-mode]' : '!isEditMode',
      '[class.bd-edit-mode]' : 'isEditMode'
    }
  };

   get viewMode(): ViewMode {
     return this._viewMode;
   }

   set viewMode(viewMode: ViewMode) {
     this._viewMode = viewMode;
   }

    private _isExpanded: boolean = false;
    private _viewMode: ViewMode = ViewMode.View;

    public get isEditMode(): boolean {
      return this.viewMode === ViewMode.Edit;
    }

    public get isExpanded(): boolean {
       return this.viewMode !== ViewMode.ViewCollapsed;
   }
}
