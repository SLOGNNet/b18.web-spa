import { Component, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Stop, Load, StopAction } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseForm } from '../base-form';
import { StopActionActions } from '../../actions';

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

  private fields = [
    { name: 'id', validators: [] }
  ];

  constructor(
    private stopActionActions: StopActionActions,
    private formBuilder: FormBuilder, elementRef: ElementRef){
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    this.fields.forEach(field => {
      this.stopForm.setControl(
        field.name,
        this.formBuilder.control({value: this.stop[field.name], disabled: this.disabled}, field.validators)
      );
    });
    this.stopForm.setControl('stopActions', this.formBuilder.array([]));
  }

  onStopActionUpdate(stopAction: StopAction) {
    this.stopActionActions.update(stopAction);
  }

  onStopActionAdd(stopAction: StopAction) {
    this.stopActionActions.add(stopAction, this.stop);
  }

  onStopActionRemove(stopAction: StopAction) {
    this.stopActionActions.remove(stopAction, this.stop);
  }
}
