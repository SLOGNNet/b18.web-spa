import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../../../../models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.scss'],
})
export class CompanyContact {
  @Input() contact: Contact;
  @Output() remove = new EventEmitter();
  constructor(protected router: Router, protected route: ActivatedRoute) {
  };

  get fullName() {
    return `${this.contact.firstName} ${this.contact.lastName}`;
  }

  onEdit() {
    this.router.navigate([`edit-contact/${this.contact.id}`], { preserveQueryParams: true, relativeTo: this.route });
  }

  onRemove() {
    this.remove.emit(this.contact);
  }
}
