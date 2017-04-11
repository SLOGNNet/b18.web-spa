import { ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { ViewMode } from '../../shared/enums';

export class BaseForm {
  public static metaData: Object = {
    inputs: ['viewMode', 'isNestedForm'],
    host: {
      '[class.bd-view-mode]': '!isEditMode',
      '[class.bd-edit-mode]': 'isEditMode',
      '[class.bd-form]': 'true',
      '(control-blur)': 'onFormControlBlur($event)'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
  };
  private _viewMode: ViewMode = ViewMode.View;
  constructor(protected elementRef: ElementRef) {

  }

  get viewMode(): ViewMode {
    return this._viewMode;
  }

  set viewMode(viewMode: ViewMode) {
    this._viewMode = viewMode;
  }

  public onFormBlur() {
    return false;
  }

  private onFormControlBlur(event: CustomEvent) {
    const isFormBlured = !this.elementRef.nativeElement.contains(event.detail.relatedTarget);
    if (isFormBlured) {
      if (!this.onFormBlur()) {
        event.stopPropagation();
      }
    }
  }

  public get isEditMode(): boolean {
    return this.viewMode === ViewMode.Edit;
  }

  public get isExpanded(): boolean {
    return this.viewMode !== ViewMode.ViewCollapsed;
  }
}
