import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    ORDERED_RESTRICTIONS = ['B', 'C', 'D', 'E', 'F', 'G', 'K', 'L', 'M', 'N', 'O', 'Z', 'T'];
    ORDERED_ENDORSEMENTS = ['P', 'H', 'M', 'N', 'T', 'X', 'L', 'S'];
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
