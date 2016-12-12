import { Component, Input, ViewChild, OnChanges, QueryList, ViewChildren } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BdFormControl } from '../..';
@Component({
  selector: 'bd-validator',
  styleUrls: ['./bd-validator.component.scss'],
  templateUrl: './bd-validator.component.html',
})
export class BdValidatorComponent implements OnChanges {
  @Input()
  component: BdFormControl;
  @Input()
  errorDefs: any;
  @ViewChild(NgControl) controls;
  errorMessage: string = '';

  ngAfterViewInit() {
    const test = this.controls;
  }

  ngOnChanges(changes: any): void {
    const component: BdFormControl = changes.component.currentValue;
    component.valueChanges.subscribe(() => {
      debugger;
      this.checkErrors(component);
    });
debugger;
    this.checkErrors(component);
  }
  checkErrors(control) {
    this.errorMessage = '';
    const errors = control.errors;
    if (errors /* && control.touched */) {
      Object.keys(this.errorDefs).some(key => {
        if (errors[key]) {
          this.errorMessage = this.errorDefs[key];
          return true;
        }
      });
    }
  }
}
