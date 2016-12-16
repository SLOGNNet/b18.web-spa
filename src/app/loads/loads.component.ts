import { Component, ChangeDetectorRef } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Load } from '../models';
import { LoadService } from '../shared';
import { ViewMode } from '../shared/enums';

@Component({
    selector: 'loads',
    templateUrl: './loads.component.html'
})
export class LoadsComponent {
  columns = [
     { prop: 'id', name: 'Load #' },
     { prop: 'customer.name', name: 'Customer' },
     { prop: 'status', name: 'Status'}
   ];
  public selectedLoad: Load = null;
  public loadViewMode: ViewMode = ViewMode.Edit;
  public loads: Load[] = new Array<Load>();

  constructor(private loadService: LoadService) {
    loadService.getAll().subscribe((loads) => {
      this.loads = loads;
    });
  }

  public onLoadSelect(load) {
     this.selectedLoad = load.selected[0];
  }
}
