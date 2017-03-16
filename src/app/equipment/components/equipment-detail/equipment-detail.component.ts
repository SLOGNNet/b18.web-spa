import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Equipment } from '../../../models';
import { BaseDetailComponent } from '../../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverActions } from '../../../actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';

@Component({
    selector: 'equipment-detail',
    templateUrl: './equipment-detail.component.html',
    styleUrls: ['./equipment-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentDetailComponent extends BaseDetailComponent<Equipment> {
  @Input() equipment: Equipment;

}
