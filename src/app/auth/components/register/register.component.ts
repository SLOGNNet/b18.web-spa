import { Component, OnInit } from '@angular/core';

import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  formViewMode: ViewMode;

  ngOnInit() {
    this.formViewMode = ViewMode.Edit;
  }

}
