import { Input, Output } from '@angular/core';
import { ViewMode } from '../../shared/enums';

export class BaseForm {
    public static genericInputs: string[] = ['isEpxanded', 'viewMode'];

    get isExpanded(): boolean {
       return this._isExpanded;
   }
   set isExpanded(isExpanded: boolean) {
      if (!this.isEditMode) {
       this._isExpanded = isExpanded;
      }
      else {
        console.log("can't expand in edit mode");
      }
   }

   get viewMode(): ViewMode {
     return this._viewMode;
   }

   set viewMode(viewMode: ViewMode) {
     this._viewMode = viewMode;
     if (this.isEditMode) {
       this._isExpanded = true;
     }
   }

    private _isExpanded: boolean = false;
    private _viewMode: ViewMode = ViewMode.View;

    public get isEditMode(): boolean {
      return this.viewMode === ViewMode.Edit;
    }
}
