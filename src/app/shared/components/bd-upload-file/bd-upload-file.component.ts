import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-upload-file',
  styleUrls: ['bd-upload-file.component.scss'],
  templateUrl: './bd-upload-file.component.html'
})
export class BdUploadFileComponent {

      private dragging: boolean = false;
      private loading: boolean = false;
      private isDocumentLoaded: boolean = false;
      private documentFile: any;
      private documentIssueDate: string;
      @Input() private documentType: string = "";

      @Output() documentLoad: EventEmitter<any> = new EventEmitter();

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
          this.documentFile = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
          let reader = new FileReader();
          this.isDocumentLoaded = true;

          this.documentLoad.emit({
            type :this.documentType,
            isLoaded: this.isDocumentLoaded
          });

          reader.readAsDataURL(this.documentFile);
      }

}
