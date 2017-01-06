import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-file-preview',
  styleUrls: ['bd-file-preview.component.scss'],
  templateUrl: './bd-file-preview.component.html'
})
export class BdFilePreviewComponent {


      private documentFile: any;
      private documentIssueDate: string;
      @Input() private documentType: string = "";
      @Input() private isDocumentLoaded: boolean = false;

      onRemoveClick(){
        this.documentFile = null;
        this.documentType = "";
        this.isDocumentLoaded = false;
      }

}
