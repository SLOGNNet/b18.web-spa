import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'bd-file-preview',
  styleUrls: ['bd-file-preview.component.scss'],
  templateUrl: './bd-file-preview.component.html',
  providers: [DatePipe]
})
export class BdFilePreviewComponent {

      private documentIssueDate: any;
      private titleText: string = '';
      @Input() private documentType: string = '';
      @Input() private itemIndex: number;
      @Input() private item: Object;

      @Output() private removeFile: EventEmitter<any> = new EventEmitter();

      constructor(public datepipe: DatePipe){}

      ngOnInit(){
        this.titleText = this.documentType + ' (' + this.itemIndex + ')';
        this.documentIssueDate = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
      }

      onRemoveClick(event){
        this.removeFile.emit({
          action: 'remove',
          document: this.item
        });
      }

}
