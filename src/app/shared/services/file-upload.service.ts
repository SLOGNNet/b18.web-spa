import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class FileUploadService {

  private progress$: Observable<number>;
  private progress: number = 0;
  private progressObserver: any;
  private xhr: XMLHttpRequest = new XMLHttpRequest();

  constructor() {
    this.progress$ = new Observable(observer => {
      this.progressObserver = observer;
    });
  }

  public getObserver(): Observable<number> {
    return this.progress$;
  }

  public upload(url: string, file: File) {
    let formData: FormData = new FormData();

    formData.append('filename', file);

    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState === 4) {
        if (this.xhr.status === 200) {
          console.log('successfully loaded)');
        } else {
          console.log('something went wrong(');
        }
      }
    };

    this.setUploadUpdateInterval(500);

    this.xhr.upload.onprogress = (event) => {
      this.progress = Math.round(event.loaded / event.total * 100);
      this.progressObserver.next(this.progress);
    };

    this.xhr.open('POST', url, true);
    this.xhr.setRequestHeader('enctype', 'multipart/form-data');
    this.xhr.send(formData);
  }

  public abort(){
    this.xhr.abort();
  }

  public setUploadUpdateInterval(interval: number): void {
    setInterval(() => { }, interval);
  }
}
