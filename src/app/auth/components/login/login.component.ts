import { Component, OnInit } from '@angular/core';
import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  formViewMode: ViewMode;

  ngOnInit() {
    this.formViewMode = ViewMode.Edit;
  }
}
