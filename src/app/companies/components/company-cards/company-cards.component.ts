import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Company } from '../../../models';

@Component({
    selector: 'company-cards',
    templateUrl: './company-cards.component.html',
    styleUrls: ['./company-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyCardsComponent {
  public parentHover: boolean = false;
  
  @Input() companies: Array<Company>;
  @Input() selected: Array<Company> = [];
  @Output() select: EventEmitter<any> = new EventEmitter();

  onCardSelect(item) {
    this.select.emit({selected: [item]});
  }

  isActive(id) {
    const selected = this.selected.find(i => {
      return i.id === id;
    });

    return selected;
  }

  @HostListener('mouseenter') mouseover() {
   this.parentHover = true;
 };

 @HostListener('mouseleave') mouseleave() {
   this.parentHover = false;
 }
}
