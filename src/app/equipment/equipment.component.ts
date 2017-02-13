import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Equipment } from '../models';
import { EquipmentActions } from '../actions';
import { EquipmentService } from '../shared';
import { ViewMode } from '../shared/enums';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseListComponent } from '../base';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../store';

@Component({
  selector: 'equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentComponent extends BaseListComponent<Equipment> {

  constructor(
    equipmentActions: EquipmentActions,
    router: Router,
    route: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>) {
    super(equipmentActions, ngRedux.select(state => state.equipments.items), router, route);
  }

  protected routePath(): string {
    return 'equipment/';
  }

  private trackBy(index: number, equipment: Equipment) {
    return equipment.id;
  }
}
