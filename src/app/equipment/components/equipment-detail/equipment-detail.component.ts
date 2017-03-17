import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Equipment } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentActions } from '../../../actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';

@Component({
  selector: 'equipment-detail',
  templateUrl: './equipment-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentDetailComponent extends BaseDetailComponent<Equipment> {
  private anchors = [{
    id: 'equipment-detail-employment',
    title: 'Employment'
  },
  {
    id: 'equipment-detail-assignment',
    title: 'Assignment'
  }, {
    id: 'equipment-detail-details',
    title: 'Details'
  }];

  constructor(
    equipmentActions: EquipmentActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>,
    protected cdr: ChangeDetectorRef) {
    super(equipmentActions, ngRedux.select(state => state.equipments.selected), router, route, cdr);
  }

  get equipmentInfo(): string {
    return [this.selectedItem.make, this.selectedItem.model].filter(v => v).join(' ');
  }

}
