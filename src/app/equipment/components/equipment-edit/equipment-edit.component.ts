import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Equipment } from '../../../models';
import { BaseEditComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EquipmentActions } from '../../../actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';
import { DriverForm } from '../../../forms';

@Component({
  selector: 'equipment-edit',
  templateUrl: './equipment-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentEditComponent extends BaseEditComponent<Equipment> {
  private anchors = [{
    id: 'equipment-employment-information',
    title: 'Employment'
  }, {
    id: 'equipment-assignment-information',
    title: 'Assignment'
  }, {
    id: 'equipment-details-information',
    title: 'Equipment details'
  }, {
    id: 'equipment-details-mileage',
    title: 'Mileage'
  }];

  constructor(
    private cdr: ChangeDetectorRef,
    private equipmentActions: EquipmentActions,
    route: ActivatedRoute,
    location: Location,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
      super(equipmentActions, ngRedux.select(state => state.equipments.selected),
        ngRedux.select(state => state.drivers.isLoading), route, router, location);
  }

  isDetailsChanged() {
    return this;
  }

}
