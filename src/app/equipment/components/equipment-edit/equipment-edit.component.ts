import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Equipment } from '../../../models';
import { BaseRootEditComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EquipmentActions } from '../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store';
import { EquipmentForm } from '../../../forms';

@Component({
  selector: 'equipment-edit',
  templateUrl: './equipment-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentEditComponent extends BaseRootEditComponent<Equipment> {

  @ViewChild(EquipmentForm) equipmentFormComponent: EquipmentForm;

  private anchors = [{
    id: 'equipment-employment-information',
    title: 'Employment'
  }, {
    id: 'equipment-details-information',
    title: 'Equipment details'
  }, {
    id: 'equipment-details-mileage',
    title: 'Mileage'
  }];

  constructor(
    cdr: ChangeDetectorRef,
    private equipmentActions: EquipmentActions,
    route: ActivatedRoute,
    location: Location,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
      super(equipmentActions, ngRedux.select(state => state.equipments.selected),
        ngRedux.select(state => state.equipments.isLoading), route, router, location, cdr);
  }

  isDetailsChanged() {
    return this.equipmentFormComponent && this.equipmentFormComponent.equipmentForm.dirty;
  }

}
