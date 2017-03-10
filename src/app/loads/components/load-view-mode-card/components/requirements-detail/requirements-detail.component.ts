import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Load, AppointmentTypes, Appointment, TripStop, StopActionTypes, StopAction } from '../../../../../models';


@Component({
  selector: 'requirements-detail',
  templateUrl: './requirements-detail.component.html',
  styleUrls: ['./requirements-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequirementsDetailComponent {
  @Input() load: Load;
  private isAdditionalRequirements: boolean = false;

}
