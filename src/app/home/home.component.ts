import { Component } from '@angular/core';
import {
  TableOptions,
  TableColumn,
  ColumnMode
} from 'angular2-data-table';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
  rows = [
  {
      "name": "Ethel Price",
      "gender": "female",
      "company": "My company name is very long and funny because funny is fun",
      "age": 22
  },
  {
      "name": "Claudine Neal",
      "gender": "female",
      "company": "Sealoud",
      "age": 55
  },
  {
      "name": "Beryl Rice",
      "gender": "female",
      "company": "Velity",
      "age": 67
  },
  {
      "name": "Wilder Gonzales",
      "gender": "male",
      "company": "Geekko",
      "age": 12
  },
  {
      "name": "Georgina Schultz",
      "gender": "female",
      "company": "Suretech",
      "age": 14
  }];

options = new TableOptions({
  columnMode: ColumnMode.force,
  headerHeight: 50,
  footerHeight: 50,
  rowHeight: 'auto',
  columns: [
    new TableColumn({ prop: 'name' }),
    new TableColumn({ prop: 'age' }),
    new TableColumn({ name: 'Gender' }),
    new TableColumn({ name: 'Company' })
  ]
});
}
