import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  // private maxContactId: number = 0;
  private contacts: Contact[] = [];

  constructor(private http: HttpClient) { }

  getContacts(): void {
    this.http
      .get<{ message: string; contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (response) => {
          this.contacts = response.contacts;
          this.contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
          this.contactChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        },
      );
  }

  getContact(id: string): Contact | null {
    const found = this.contacts.find((c) => c.id === id);
    return found ? { ...found } : null;
  }

  addContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        this.contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        `http://localhost:3000/contacts/${originalContact.id}`,
        newContact,
        { headers: headers }
      )
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id).subscribe(() => {
      this.contacts.splice(pos, 1);
      this.contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
      this.contactChangedEvent.next(this.contacts.slice());
    });

    // storeContacts(): void {
    //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //   this.http
    //     .put(
    //       'https://cms-project-af83b-default-rtdb.firebaseio.com/contacts.json',
    //       JSON.stringify(this.contacts),
    //       { headers: headers },
    //     )
    //     .subscribe(() => {
    //       this.contactChangedEvent.next(this.contacts.slice());
    //     });
    // }
  }
}