import { Component } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

  rows = [];
  loadingIndicator: boolean = true;
  items = ['Jacky Chan - actor', 'Bill Gates - MS CEO', 'John Doe - xz', 'Vasia Pupkin - clown', 'Anton Ivanovich - director'];

  columns = [
     { prop: 'name' } ,
     { name: 'Company' },
     { name: 'Gender' }
   ];

   switchButtons1 = [ 'Company', 'Customer' , 'None'];

   switchButtons2 = [ 'Dry', 'Reefer' ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }



   fetch(cb) {
     const req = new XMLHttpRequest();
     req.open('GET', `app/home/testdata.json`);

     req.onload = () => {
       cb(JSON.parse(req.response));
     };

     req.send();
   }
}
