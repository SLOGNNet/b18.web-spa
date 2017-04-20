import { Component, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Stop, Load } from '../../../../../models';
import { BaseNestedEditComponent } from '../../../../../base';
import { StopActions } from '../../../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, selectDetailLoad, selectDetailStop } from '../../../../../store';
import { StopFormComponent } from '../../../../../forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'load-edit-stop',
  templateUrl: './load-edit-stop.component.html',
  styleUrls: ['./load-edit-stop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadEditStopComponent extends BaseNestedEditComponent<Stop, Load>{
  protected segment = 'edit-stop';
  private locations$;
  private form: FormGroup = this.formBuilder.group({});
  private locations: Array<any>;
  private parentLoad: Load;
  private anchors = [{
    id: '',
    title: 'Itinerary'
  }];

  constructor(
    cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    stopActions: StopActions,
    route: ActivatedRoute,
    location: Location,
    router: Router,
    private ngRedux: NgRedux<IAppState>) {
    super(stopActions, ngRedux.select(selectDetailLoad), ngRedux.select(selectDetailStop),
      ngRedux.select(state => state.ui.stops.isLoading), route, router, location, cdr);
  }

  isDetailsChanged() {
    return this.form && this.form.dirty;
  }

  onFormSave(): boolean {
    if (this.form.valid) {
      this.form.markAsPristine();
      super.onItemSave(this.form.value);
    }

    return this.form.valid;
  }

  onStopAdd() {
    if (this.onFormSave()) {

    }
  }

  getItemName() {
    return 'Stop';
  }
}
