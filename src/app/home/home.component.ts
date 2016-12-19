import { Component, ElementRef, ViewChild } from '@angular/core';
import { BdInputComponent } from '../shared/components/bd-input';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { BdFormTypeaheadComponent } from '../shared/components/bd-form-typeahead';

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

   @ViewChild('input') _inputElement: ElementRef;
   @ViewChild('bdinput') _bdinputElement: BdInputComponent;
  //  @ViewChild('bdtypeahead') _bdtypeaheadElement: BdFormTypeaheadComponent;

  constructor(elementRef: ElementRef) {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

onClick(){
  this._inputElement.nativeElement.blur();
}

onBdInpClick(){
  console.log(this._bdinputElement,'this._bdinputElement');
  this._bdinputElement.blur();
}


// onBdTypeaheadClick(){
//   console.log(this._bdtypeaheadElement);
// }

   fetch(cb) {
     const req = new XMLHttpRequest();
     req.open('GET', `app/home/testdata.json`);

     req.onload = () => {
       cb(JSON.parse(req.response));
     };

     req.send();
   }
}
