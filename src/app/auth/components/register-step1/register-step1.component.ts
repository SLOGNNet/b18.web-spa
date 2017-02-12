import { Component, OnInit } from '@angular/core';
import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-register-step1',
  templateUrl: './register-step1.component.html',
  styleUrls: ['./register-step1.component.scss']
})
export class RegisterStep1Component implements OnInit{

  formViewMode: ViewMode;

  ngOnInit() {
    this.formViewMode = ViewMode.Edit;
  }

}
