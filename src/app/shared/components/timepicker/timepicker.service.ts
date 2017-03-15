import { Injectable } from '@angular/core';

@Injectable()
export class TimePickerService {

  private listOfHours = [
    [
      {
        label: '00:00'
      },
      {
        label: '01:00'
      },
      {
        label: '02:00'
      },
      {
        label: '03:00'
      },
      {
        label: '04:00'
      },
      {
        label: '05:00'
      }
    ],
    [
      {
        label: '06:00'
      },
      {
        label: '07:00'
      },
      {
        label: '08:00'
      },
      {
        label: '09:00'
      },
      {
        label: '10:00'
      },
      {
        label: '11:00'
      }
    ],
    [
      {
        label: '12:00'
      },
      {
        label: '13:00'
      },
      {
        label: '14:00'
      },
      {
        label: '15:00'
      },
      {
        label: '16:00'
      },
      {
        label: '17:00'
      }
    ],
    [
      {
        label: '18:00'
      },
      {
        label: '19:00'
      },
      {
        label: '20:00'
      },
      {
        label: '21:00'
      },
      {
        label: '22:00'
      },
      {
        label: '23:00'
      }
    ]
  ];

  constructor() {}

  getHours() {
    return this.listOfHours;
  }

}
