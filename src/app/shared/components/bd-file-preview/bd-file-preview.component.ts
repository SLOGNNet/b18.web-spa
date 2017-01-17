import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FileUploadService } from '../..';

const DEFAULT_ELEMENT_WIDTH = 100;

@Component({
  selector: 'bd-file-preview',
  styleUrls: ['bd-file-preview.component.scss'],
  templateUrl: './bd-file-preview.component.html',
  providers: [DatePipe, FileUploadService]
})
export class BdFilePreviewComponent {

      private documentIssueDate: string;
      private titleText: string;
      private uploadProgress: number = DEFAULT_ELEMENT_WIDTH;
      @Input() private documentType: string;
      @Input() private itemIndex: number;
      @Input() private document: File;

      @Output() private removeFile: EventEmitter<any> = new EventEmitter();

      constructor(public datepipe: DatePipe, public fileUploadService: FileUploadService, private _cdr: ChangeDetectorRef){
      }

      ngOnInit(){
        this.titleText = this.documentType + ' (' + this.itemIndex + ')';
        this.documentIssueDate = this.datepipe.transform(new Date(), 'dd/MM/yyyy');

        this.fileUploadService.getObserver()
            .subscribe(progress => {
                this.uploadProgress = DEFAULT_ELEMENT_WIDTH - progress;
                this._cdr.markForCheck();
            });

        try {
            this.fileUploadService.upload(this.document);
        } catch (error) {
            console.error(error);
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
