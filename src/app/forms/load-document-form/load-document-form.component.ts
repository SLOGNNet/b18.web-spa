import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EnumHelperService, BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'load-document-form',
  templateUrl: './load-document-form.component.html',
  styleUrls: ['./load-document-form.component.scss'],
}, BaseForm.metaData))
export class LoadDocumentFormComponent extends BaseForm {

  private documentType: string = "";
  private documentLoaded: boolean = false;


  constructor() {
    super();
  }

  documentOnLoad(event){
    this.documentType = event.type;
    this.documentLoaded = event.isLoaded;
  }
}
