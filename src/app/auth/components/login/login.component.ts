import { Component, OnInit } from '@angular/core';
import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginViewMode: ViewMode;

  ngOnInit() {
    this.loginViewMode = ViewMode.Edit;
  }

}

