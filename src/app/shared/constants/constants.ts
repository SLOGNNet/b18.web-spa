import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    DATE_FORMAT = 'MM/DD/YYYY';
    USER_NAME_TYPES = [
      {
        key: 'email',
        value: 'Email'
      },
      {
        key: 'phone',
        value: 'Phone'
      }
    ];
};
