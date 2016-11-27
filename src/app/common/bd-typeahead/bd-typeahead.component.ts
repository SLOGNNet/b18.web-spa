import { Component, ElementRef, TemplateRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { positionService } from 'ng2-bootstrap/ng2-bootstrap';
import { TypeaheadOptions } from './typeahead-options.class';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bd-typeahead',
  templateUrl: './bd-typeahead.component.html',
  styleUrls: ['./bd-typeahead.component.scss']
})
export class BdTypeaheadComponent {
  @Input() public itemTemplate: TemplateRef<any>;
  @Input() public labelText: string = '';
  @Input() public source: Observable<any>;
  @Input() public optionField: string;
  @Output() public onSelect: EventEmitter<any> = new EventEmitter<any>(false);

  public value: string;
  private footerTempalteId: string = 'footerTemplate';
  public constructor() {

  }
  public states: Array<string> = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico',
    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'];
  public changeTypeaheadLoading(e: boolean): void {
    this.footerTempalteId = e ? 'footerWithLoadingTemplate' : 'footerTemplate';
  }

  public changeTypeaheadNoResults(e: boolean): void {
  }

  public typeaheadOnSelect(match): void {
      debugger;
      this.onSelect.emit(match);
  }
}
