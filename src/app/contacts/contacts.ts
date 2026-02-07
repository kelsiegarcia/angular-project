import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';


@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css'],
})
export class Contacts {
  // selectedContact?: Contact;
  selectedContact: Contact | null = null;

  // inject the ContactService into the Contacts component
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
        this.onSelected(contact);
      }
    );
  }

  onSelected(contact: Contact) {
    this.selectedContact = contact;
  }
}
