import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Equipment } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentActions } from '../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, selectDetailEquipment } from '../../../store';

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
    id: 'equipment-detail-details',
    title: 'Details'
  }, {
    id: 'equipment-detail-mileage',
    title: 'Mileage'
  }];

  private showAll: Boolean = false;

  constructor(
    equipmentActions: EquipmentActions,
    route: ActivatedRoute,
    router: Router,
    ngRedux: NgRedux<IAppState>,
    protected cdr: ChangeDetectorRef) {
    super(equipmentActions, ngRedux.select(selectDetailEquipment), router, route, cdr);
  }

  get equipmentInfo(): string {
    return [this.selectedItem.make, this.selectedItem.model].filter(v => v).join(' ');
  }

  public toggleView() {
    this.showAll = !this.showAll;
  }

}
