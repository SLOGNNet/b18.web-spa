import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '../../models';
import { ViewMode } from '../../shared/enums';
import { GoogleService } from '../../shared';
import { BaseForm } from '../base-form';

@Component({
  selector: 'location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationForm {
  @Input() viewMode: ViewMode = ViewMode.View;
  @Input() isNameFieldVisible: boolean = true;
  @Input() location: Location;
  @Input('group') locationForm: FormGroup;
  @Output() update = new EventEmitter();
  @Output() updatePlace = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    this.locationForm.addControl('id', this.formBuilder.group({
      id: [this.location.id]
    }));
    this.locationForm.addControl('address', this.formBuilder.group({ }));
    this.locationForm.addControl('contactInfo', this.formBuilder.array([]));
  }

  updateItem(e) {
    this.update.emit(e);
  }

  onUpdatePlace(e) {
    this.updatePlace.emit(e);
  }
}
