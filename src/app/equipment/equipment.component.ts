import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Equipment } from '../models';
import { EquipmentActions } from '../actions';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '../base';
import { NgRedux } from '@angular-redux/store';
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
