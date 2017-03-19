import { Component, OnInit } from '@angular/core';
import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-new-password',
  templateUrl: './new-password.component.html'
})
export class NewPasswordComponent implements OnInit {

  formViewMode: ViewMode;

  ngOnInit() {
    this.formViewMode = ViewMode.Edit;
  }
}
