import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Injectable()
export class GoogleService {
  private predictionsService;
  private detailsService;
  private componentForm = {
    route: 'long_name',
    locality: 'long_name',
    sublocality_level_1: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
    street_number: 'short_name'
  };

  constructor() {
    this.predictionsService = new google.maps.places.AutocompleteService();
    this.detailsService = new google.maps.places.PlacesService(document.createElement('div'));
  }

  getPredictions(query: string): Observable<any[]> {
    return Observable.create((observer: any) => {
      if (query.trim().length) {
        this.predictionsService.getQueryPredictions({ input: query }, data => observer.next(data || []));
      } else {
        observer.next([]);
      }
    });
  }

  getDetails(placeId: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.detailsService.getDetails({ placeId: placeId }, data => observer.next(this.formatDetails(data)));
    });
  }

  private formatDetails(place) {
    if (!place || !place.geometry) {
      return null;
    }

    let details = {
      route: '',
      locality: '',
      sublocality_level_1: '',
      administrative_area_level_1: '',
      country: '',
      postal_code: '',
      street_number: ''
    };

    for (let i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types[0];

      if (this.componentForm[addressType]) {
        details[addressType] = place.address_components[i][this.componentForm[addressType]];
      }
    }

    let streetAddress1 = [details.street_number, details.route].filter(v => v).join(' ');
    let city = [details.locality, details.sublocality_level_1].filter(v => v)[0];

    return {
      city: city,
      zip: details.postal_code,
      streetAddress1: streetAddress1,
      state: details.administrative_area_level_1,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    };
  }
}
