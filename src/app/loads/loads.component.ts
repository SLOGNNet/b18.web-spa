import { Component, ViewChild } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Load } from '../models';
import { LoadService } from '../shared';
import { ViewMode } from '../shared/enums';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'loads',
    templateUrl: './loads.component.html',
    styleUrls: ['./loads.component.scss']
})
export class LoadsComponent {
  @ViewChild('datatable') datatable;
  columns = [
     { prop: 'id', name: 'Load #' },
     { prop: 'customer.name', name: 'Customer' },
     { prop: 'status', name: 'Status'}
   ];
  isLoadNew = false;
  public selectedLoad: Load = null;
  public loadViewMode: ViewMode = ViewMode.Edit;
  public loads: Load[] = new Array<Load>();

  constructor(private loadService: LoadService) {
    loadService.getAll().subscribe((loads) => {
      this.loads = loads;
    });
  }

  public onLoadSelect(load) {
    this.isLoadNew = false;
    this.selectedLoad = cloneDeep(load.selected[0]);
  }

  private onAddLoad() {
    this.deselectRow();
    this.isLoadNew = true;
    this.selectedLoad = Load.create();
  }

  private onLoadSave(load) {
    if (this.isLoadNew) {
      this.isLoadNew = false;
      this.loadService.create(load);
    } else {
      this.loadService.update(load);
    }

    this.selectedLoad = cloneDeep(load);
  }

  private onLoadCancel() {
    if (this.isLoadNew) {
      this.isLoadNew = false;
      this.selectedLoad = null;
    } else {
      this.selectedLoad = cloneDeep(this.selectedLoad);
    }
  }

  private deselectRow() {
    this.datatable.selected = [];
  }
}
