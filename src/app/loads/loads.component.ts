import { Component } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Load } from '../models';
import { LoadService } from '../shared';

@Component({
    selector: 'loads',
    templateUrl: './loads.component.html'
})
export class LoadsComponent {
  public selectedLoad: Load = new Load();
  constructor(private loadService: LoadService) {
    loadService.getDetails(1).subscribe((load) => {
      this.selectedLoad = load;
    });
  }
}
