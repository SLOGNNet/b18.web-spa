import { Component, Input, Output, EventEmitter } from '@angular/core';

const URL = 'http://localhost:5000/upload',
            DEFAULT_WIDTH = 100;

@Component({
  selector: 'bd-upload-file',
  styleUrls: ['bd-upload-file.component.scss'],
  templateUrl: './bd-upload-file.component.html'
})
export class BdUploadFileComponent {

      private _progressWidth: number = 0;
      private dragging: boolean = false;
      private loading: boolean = false;
      private documentFiles: any[];
      private documentIssueDate: string;

      get showProgressBar() {
        return this.dragging;
      }

      get uploadingProcess() {
        return this.loading && !this.dragging;
      }

      get progressWidth(): number {
          return DEFAULT_WIDTH - this._progressWidth;
      }

      set progressWidth(val: number) {
         this._progressWidth = val;
      }

      @Input() private documentType: string = '';

      @Output() private documentsSelected: EventEmitter<any> = new EventEmitter();

      constructor(){
        this.documentFiles = [];
      }

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

          for (let i = 0, length = fileList.length; i < length; i++) {
              this.documentFiles.push({
                'document': fileList.item(i),
                'documentType': this.documentType
              });
          }
          this.documentsSelected.emit({
            documents: this.documentFiles
          });

          this.upload(this.documentFiles);
      }

      public upload (files: any[]){
            let formData: FormData = new FormData(),
                  xhr: XMLHttpRequest = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formData.append('filename', files[i].document);
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log('successfully loaded)');
                    } else {
                        console.log('something went wrong(');
                    }
                }
                this.progressWidth = 0;
            };

            xhr.upload.onprogress = (event) => {
                this.loading = true;
                this.progressWidth = Math.round(event.loaded / event.total * 100);
            };

            xhr.upload.onloadend = (event) => {
                this.loading = false;
            };

            xhr.open('POST', URL, true);
            xhr.setRequestHeader('enctype', 'multipart/form-data');
            xhr.send(formData);
    }

}
