import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Injectable()
export class GoogleService {
  constructor(private http: Http) {
    this.http = http;
  }

  search(query: string): Observable<any[]> {
   var service = new google.maps.places.AutocompleteService();
      return Observable.of(
      service.getQueryPredictions({ input: query }, data => data)
    );
  }
}
