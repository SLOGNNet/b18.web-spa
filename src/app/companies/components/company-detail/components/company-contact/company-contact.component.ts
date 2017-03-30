import { Component, Input } from '@angular/core';
import { Contact } from '../../../../../models';

@Component({
  selector: 'company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.scss'],
})
export class CompanyContact {
  @Input() contact: Contact;
  @Input() parentHover: boolean = false;

  get contactInitials() {
    return this.contact.firstName + ' ' + this.contact.lastName;
  }

}
