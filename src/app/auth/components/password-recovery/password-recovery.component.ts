import { Component, OnInit } from '@angular/core';
import { ViewMode } from '../../../shared/enums';

@Component({
  selector: 'bd-password-recovery',
  templateUrl: './password-recovery.component.html'
})
export class PasswordRecoveryComponent implements OnInit{

  formViewMode: ViewMode;

  ngOnInit() {
    this.formViewMode = ViewMode.Edit;
  }
}
