import { Component, Input } from '@angular/core';
import { NgbDateStruct } from './ngb-date-struct';

@Component({
  selector: '[ngbDatepickerDayView]',
  styles: [`
    :host {
      text-align: center;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height:100%;
      background:#fff;
      color: #d7d8db;
    }
  `],
  host: {
    '[class.bg-primary]': 'selected',
    '[class.current-day]': 'selected',
    '[class.text-white]': 'selected',
    '[class.text-muted]': 'isMuted()',
    '[class.btn-secondary]': '!disabled'
  },
  template: `{{ date.day }}`
})
export class NgbDatepickerDayView {
  @Input() currentMonth: number;
  @Input() date: NgbDateStruct;
  @Input() disabled: boolean;
  @Input() selected: boolean;

  isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
