import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EnumHelperService, BdFormBuilder, BdFormGroup, FormValidationService } from '../../shared';
import { ViewMode } from '../../shared/enums';
import { Document } from '../../models';
import { BaseForm } from '../base-form';
import { FileUploadService } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { without } from 'lodash';

const URL = 'http://localhost:5000/upload';

class ProgressItem {
   progress: Observable<any>;
   item: Document;

   constructor(){}
}

@Component(Object.assign({
  selector: 'load-document-form',
  templateUrl: './load-document-form.component.html',
  providers: [FileUploadService]
}, BaseForm.metaData))
export class LoadDocumentFormComponent extends BaseForm {

  @Input() items: Array<Document> = new Array<Document>();
  private documents: Array<ProgressItem> = [];

  constructor(public fileUploadService: FileUploadService, element: ElementRef) {
    super(element);
  }

  createProgressItem(progress, item): ProgressItem {
    let result = new ProgressItem();
    result.progress = progress;
    result.item = item;
    return result;
  }

  createDocumentItem(file, type): Document {
    let result = new Document();
    result.file = file;
    result.type = type;
    return result;
  }

  ngOnChanges() {
    this.items.map(item => {
        this.documents.push(this.createProgressItem(null, this.createDocumentItem(item.file, item.type)));
    });
  }

  onLoadDocuments(event) {
    event.documents.map(item => {
      this.documents.push(this.createProgressItem(this.fileUploadService.upload(URL, item), this.createDocumentItem(item, event.type)));
    });
  }

  onRemoveFile(document) {
    let itemIndexToDelete = this.documents.indexOf(document);
    if (this.documents[itemIndexToDelete].progress) {
          this.documents[itemIndexToDelete].progress.subscribe().unsubscribe();
    }
    this.documents = without(this.documents, document);
  }
}
