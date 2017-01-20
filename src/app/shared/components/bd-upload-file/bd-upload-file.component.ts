import { Component, Input, Output, EventEmitter } from '@angular/core';
import { map } from 'lodash';

@Component({
  selector: 'bd-upload-file',
  styleUrls: ['bd-upload-file.component.scss'],
  templateUrl: './bd-upload-file.component.html'
})
export class BdUploadFileComponent {

      private dragging: boolean = false;
      private documentIssueDate: string;
      private documentFiles: any[] = [];

      @Input() private documentType: string = '';

      @Output() private documentsSelected: EventEmitter<any> = new EventEmitter();

      handleDragEnter(event) {
          event.preventDefault();
          this.dragging = true;
      }

      handleDragLeave(event) {
          event.preventDefault();
          this.dragging = false;
      }

      handleDrop(event) {
          event.preventDefault();
          this.dragging = false;
          this.handleInputChange(event);
      }

      handleInputChange(event) {
          let fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

          this.documentFiles = map(fileList, item => item);

          this.documentsSelected.emit({
            documents: this.documentFiles,
            type: this.documentType,
          });
      }
}
