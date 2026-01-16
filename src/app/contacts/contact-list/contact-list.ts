import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  standalone: false,
  selector: 'cms-contact-list',
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css']
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  @Output() contactSelected = new EventEmitter<Contact>();

  private contactsService = inject(ContactsService);

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

  onContactSelected(contact: Contact) {
    this.contactSelected.emit(contact);
  }
}