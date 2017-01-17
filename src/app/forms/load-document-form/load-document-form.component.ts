import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EnumHelperService, BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { without } from 'lodash';

@Component(Object.assign({
  selector: 'load-document-form',
  templateUrl: './load-document-form.component.html'
}, BaseForm.metaData))
export class LoadDocumentFormComponent extends BaseForm {

  private documents: Object[];

  constructor(element: ElementRef) {
    super(element);
    this.documents = [];
  }

  onLoadDocuments(event) {
    event.documents.map(item => this.documents.push({ item, type: event.type }));
  }

  onRemoveFile(document) {
    this.documents = without(this.documents, document);
  }
}
