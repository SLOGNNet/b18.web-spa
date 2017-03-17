import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

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
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.appendDefaultHeaders(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  put(url, data) {
    let headers = new Headers();
    this.appendDefaultHeaders(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }

  delete(url, data) {
    let headers = new Headers();
    this.appendDefaultHeaders(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }

  extractData(res: any): any {
    return res.json();
  }
}
