import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'cms-contact-list',
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  term: string = '';
  private subscription: Subscription;

  constructor(private contactService: ContactService) {}

  search(value: string) {
    this.term = value;
  }

  ngOnInit(): void {
    this.subscription = this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });

    this.contactService.getContacts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
