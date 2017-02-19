import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bd-complexity-password-messenger',
  templateUrl: './bd-complexity-password-messenger.component.html',
  styleUrls: ['./bd-complexity-password-messenger.component.scss']
})

export class ComplexityPasswordMessengerComponent implements OnChanges {

  @Input()
  component: FormControl;
  complexity: string;

  ngOnChanges(changes: any): void {
    const component: FormControl = changes.component.currentValue;
    component.valueChanges.subscribe(password => {
      this.checkComplexity(password);
    });
  }

  checkComplexity(value: string) {
    const strongRegularExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const mediumRegularExp = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    if (strongRegularExp.test(value)) {
      this.complexity = 'strong';
    } else if (mediumRegularExp.test(value)) {
      this.complexity = 'normal';
    } else {
      this.complexity = 'low';
    }
  }

}
