import { Component } from '@angular/core';
import { CommonInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})
export class HomeComponent {
  rows = [
  {
      'name': 'Ethel Price',
      'gender': 'female',
      'company': 'My company name is very long and funny because funny is fun',
      'age': 22
  },
  {
      'name': 'Claudine Neal',
      'gender': 'female',
      'company': 'Sealoud',
      'age': 55
  },
  {
      'name': 'Beryl Rice',
      'gender': 'female',
      'company': 'Velity',
      'age': 67
  },
  {
      'name': 'Wilder Gonzales',
      'gender': 'male',
      'company': 'Geekko',
      'age': 12
  },
  {
      'name': 'Georgina Schultz',
      'gender': 'female',
      'company': 'Suretech',
      'age': 14
  }];

  items = ['Jacky Chan - actor', 'Bill Gates - MS CEO', 'John Doe - xz', 'Vasia Pupkin - clown', 'Anton Ivanovich - director'];

  columns = [
     { prop: 'name' },
     { name: 'Company' },
     { name: 'Gender' }
   ];
}
