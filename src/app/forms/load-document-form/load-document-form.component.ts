import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EnumHelperService, BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { ViewMode } from '../../shared/enums';
import { Document } from '../../models';
import { BaseForm } from '../base-form';
import { without } from 'lodash';

@Component(Object.assign({
  selector: 'load-document-form',
  templateUrl: './load-document-form.component.html'
}, BaseForm.metaData))
export class LoadDocumentFormComponent extends BaseForm {

  @Input() items: Array<Document> = new Array<Document>();
  private documents: Object[];

  constructor(element: ElementRef) {
    super(element);
  }

  ngOnInit(){
    this.documents = this.items;
  }

  ngOnChanges(){
    this.documents = this.items;
  }

  onLoadDocuments(event) {
    event.documents.map(item => this.documents.push({ file: item, type: event.type, url: '', issueDate: '', newDocument: event.newDocument }));
  }

  onRemoveFile(document) {
    this.documents = without(this.documents, document);
  }
}
