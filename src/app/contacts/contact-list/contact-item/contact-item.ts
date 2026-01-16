import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../contact.model';


@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.html',
  styleUrls: ['./contact-item.css'],
})
export class ContactItem {
  @Input() contact!: Contact;
  @Output() contactSelected = new EventEmitter<Contact>();

  onSelected() {
    this.contactSelected.emit(this.contact);
  }
}
