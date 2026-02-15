import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  standalone: false,
  selector: 'cms-contact-list',
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css']
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) { }


  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  

    this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }
}