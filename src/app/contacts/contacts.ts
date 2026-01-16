import { Component } from '@angular/core';
import { Contact } from './contact.model';


@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css'],
})
export class Contacts {
  selectedContact?: Contact;

  onSelected(contact: Contact) {
    this.selectedContact = contact;
  }
}
