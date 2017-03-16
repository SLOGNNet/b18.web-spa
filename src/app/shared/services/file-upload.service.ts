import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class FileUploadService {

  public upload(url: string, file: File): Observable<any> {
    return new Observable(progressSubject => {
      let xhr: XMLHttpRequest = new XMLHttpRequest(),
        formData: FormData = new FormData();

      formData.append('filename', file);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            progressSubject.next(100);
          } else {
            progressSubject.next(-1);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        const progress = Math.round(event.loaded / event.total * 100);
        progressSubject.next(progress);
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('enctype', 'multipart/form-data');
      xhr.send(formData);

      return () => xhr.abort();
    });
  }

}
