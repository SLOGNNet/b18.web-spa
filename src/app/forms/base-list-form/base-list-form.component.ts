import { Input, Output, EventEmitter, OnChanges, ElementRef } from '@angular/core';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

export abstract class BaseListForm<T> extends BaseForm implements OnChanges{
  public static metaData: Object = BaseForm.metaData;

  @Input()
  public items: Array<T>= new Array<T>();
  @Input()
  public formArray: FormArray;

  @Output() update: EventEmitter<T> = new EventEmitter<T>();
  @Output() add: EventEmitter<T> = new EventEmitter<T>();
  @Output() remove: EventEmitter<T> = new EventEmitter<T>();
  public renderFormData: Array<any> = new Array<any>();

  constructor(private formBuilder: FormBuilder, elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    if (changes.items) {
    if (changes.items || changes.formArray) {
      this.items = this.items || [];
      this.initForm();
    }
  }

  protected initForm() {
    this.resetData();

    for (let item of this.items) {
      this.addFormData(item);
    }

    if (this.shouldAddDefault() && this.items.length === 0) {
      this.addNewItem();
    }
  }

  protected shouldAddDefault(): boolean {
    return true;
  }

  protected addNewItem() {
    const item = this.createItem();
    this.add.emit(item);
    this.addItem(item);
  }

  protected addItem(item: T) {
      this.addFormData(item);
  }

  protected updateItem(item: T) {
    this.update.emit(item);
  }

  protected removeItem(removeData) {

    this.remove.emit(removeData.item);
    this.renderFormData = this.renderFormData.filter(data => data !== removeData);
  }

  protected abstract createItem(): T;

  private addFormData(item: any): void {
    const group = this.formBuilder.group({});
    this.renderFormData.push({ group, item });
    this.formArray.push(group);
  }

  private resetData() {
    this.renderFormData = new Array<any>();
    while (this.formArray.length > 0) {
      this.formArray.removeAt(0);
    }
  }
}
