import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FileUploadService } from '../..';
import * as moment from 'moment';

const URL = 'http://localhost:5000/upload',
            DEFAULT_ELEMENT_WIDTH = 100;

@Component({
  selector: 'bd-file-preview',
  styleUrls: ['bd-file-preview.component.scss'],
  templateUrl: './bd-file-preview.component.html',
  providers: [ FileUploadService ]
})
export class BdFilePreviewComponent {

      private dateFormat: string = 'MM/DD/YYYY';
      private documentIssueDate: string;
      private titleText: string;
      private uploadProgress: number = DEFAULT_ELEMENT_WIDTH;
      @Input() private documentType: string;
      @Input() private itemIndex: number;
      @Input() private document: File;
      @Input() newDocument: boolean = false;

      @Output() private removeFile: EventEmitter<any> = new EventEmitter();

      constructor(public fileUploadService: FileUploadService, private _cdr: ChangeDetectorRef){
      }

      ngOnInit(){
        this.titleText = this.documentType + ' (' + this.itemIndex + ')';
        this.documentIssueDate = moment(new Date()).format(this.dateFormat);

        this.fileUploadService.getObserver()
            .subscribe(progress => {
                this.uploadProgress = DEFAULT_ELEMENT_WIDTH - progress;
                this._cdr.markForCheck();
            });
        if(this.newDocument) {
          try {
              this.fileUploadService.upload(URL, this.document);
          } catch (error) {
              console.error(error);
          }
        }

      }

      onRemoveClick(event){
        // abort file upload request
        this.fileUploadService.abort();
        // remove file form collection
        this.removeFile.emit({
          action: 'remove',
          document: this.document
        });
      }

}
