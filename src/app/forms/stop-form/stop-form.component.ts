import { Component, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Stop, Load, StopAction } from '../../models';
import { ScheduleTypes } from '../../models/enums';
import { EnumHelperService } from '../../shared/helpers';
import { FacilityService } from '../../shared';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseForm } from '../base-form';
import { StopActionActions } from '../../actions';
import { Observable } from 'rxjs/Rx';

@Component(Object.assign({
  selector: 'stop-form',
  templateUrl: './stop-form.component.html',
  styleUrls: ['./stop-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
}, BaseForm.metaData))
export class StopFormComponent extends BaseForm {
  @Input() disabled: boolean = false;
  @Input() public load: Load;
  @Input() public stop: Stop;
  @Input('group')
  public stopForm: FormGroup = this.formBuilder.group({});
  private scheduleTypes: any[];
  private facilitySource: any[];
  private facilityQuery: string = '';
  private fields = [
    { name: 'id', validators: [] },
    { name: 'facility', validators: [] },
    { name: 'scheduleType', validators: [] }
  ];

  constructor(
    private facilityService: FacilityService,
    private stopActionActions: StopActionActions,
    private enumHelperService: EnumHelperService,
    private formBuilder: FormBuilder, elementRef: ElementRef) {
    super(elementRef);

    this.scheduleTypes = this.enumHelperService.getDropdownKeyValues(ScheduleTypes);
  }

  ngOnChanges(changes: any) {
    this.initForm();
    this.initFacilityTypeahead(this.stop.facility);
  }

  initForm() {
    this.fields.forEach(field => {
      this.stopForm.setControl(
        field.name,
        this.formBuilder.control({ value: this.stop[field.name], disabled: this.disabled }, field.validators)
      );
    });
    this.stopForm.setControl('stopActions', this.formBuilder.array([]));
    const appointmentGroup: FormGroup = this.formBuilder.group({
      number: [this.stop.appointment.number],
      from: [this.stop.appointment.from],
      to: [this.stop.appointment.to],
      scheduleType: [this.stop.appointment.scheduleType]
    });
    this.stopForm.setControl('appointment', appointmentGroup);
  }


  private initFacilityTypeahead(facility) {
    this.facilityQuery = facility ? facility.name : '';
    this.facilitySource = Observable.create((observer: any) => {
      observer.next(this.facilityQuery);
    }).mergeMap((token: string) => this.facilityService.search(token));
  }

  private onStopActionUpdate(stopAction: StopAction) {
    this.stopActionActions.update(stopAction);
  }

  private onStopActionAdd(stopAction: StopAction) {
    this.stopActionActions.add(stopAction, this.stop);
  }

  private onStopActionRemove(stopAction: StopAction) {
    this.stopActionActions.remove(stopAction, this.stop);
  }

  private onFacilityRemove() {
    this.stopForm.setControl('facility', this.formBuilder.control({ value: {}, disabled: this.disabled }));
  }

  private onFacilitySelect(facility) {
    this.stopForm.setControl('scheduleType', this.formBuilder.control({ value: facility.scheduleType, disabled: this.disabled }));
  }
}
