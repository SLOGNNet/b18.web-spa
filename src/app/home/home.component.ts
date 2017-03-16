import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

  rows = [];
  loadingIndicator: boolean = true;
  items = ['Jacky Chan - actor', 'Bill Gates - MS CEO', 'John Doe - xz', 'Vasia Pupkin - clown', 'Anton Ivanovich - director'];
date;
  columns = [
     { prop: 'name' } ,
     { name: 'Company' },
     { name: 'Gender' }
   ];

   switchButtons1 = [ 'Company', 'Company' , 'None'];

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
