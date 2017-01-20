import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EnumHelperService, BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { ViewMode } from '../../shared/enums';
import { Document } from '../../models';
import { BaseForm } from '../base-form';
import { FileUploadService } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { without } from 'lodash';

const URL = 'http://localhost:5000/upload';

@Component(Object.assign({
  selector: 'load-document-form',
  templateUrl: './load-document-form.component.html',
  providers: [FileUploadService]
}, BaseForm.metaData))
export class LoadDocumentFormComponent extends BaseForm {

  @Input() items: Array<Document> = new Array<Document>();
  private documents: any[];

  constructor(public fileUploadService: FileUploadService, element: ElementRef) {
    super(element);
  }

  ngOnChanges() {
    this.documents = this.items;
  }

  onLoadDocuments(event) {
    event.documents.map(item => {
      this.documents.push({
        file: item,
        type: event.type,
        url: '',
        issueDate: '',
        newDocument: event.newDocument,
        progress: this.fileUploadService.upload(URL, item)
      });
    });
  }

  onRemoveFile(document) {
    let itemIndexToDelete = this.documents.indexOf(document);
    if(this.documents[itemIndexToDelete].progress) {
          this.documents[itemIndexToDelete].progress.subscribe().unsubscribe();
    }
    this.documents = without(this.documents, document);
  }
}
