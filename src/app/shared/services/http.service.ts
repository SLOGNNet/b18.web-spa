import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  constructor(private http: Http) {}

  appendAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('b18developer:b18password'));
  }

  appendDefaultHeaders(headers: Headers): void {
    this.appendAuthorizationHeader(headers);
   // headers.append('Content-Type', 'application/json');
  };

  get(url) {
    let headers = new Headers();
    this.appendDefaultHeaders(headers);
    return this.http.get(url, {
      headers: headers
    })
    .catch(this.handleError);
  }

  post(url, data) {
    let headers = new Headers();
    this.appendDefaultHeaders(headers);
    return this.http.post(url, data, {
      headers: headers
    })
    .catch(this.handleError);
  }

  put(url, data) {
    let headers = new Headers();
    this.appendDefaultHeaders(headers);
    return this.http.put(url, data, {
      headers: headers
    })
    .catch(this.handleError);
  }

  delete(url, data) {
    let headers = new Headers();
    this.appendDefaultHeaders(headers);
    return this.http.delete(url, {
      headers: headers
    })
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = body;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  extractData(res: any): any {
    return res.json();
  }
}
