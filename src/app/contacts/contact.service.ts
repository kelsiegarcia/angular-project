import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  private maxContactId: number = 0;
  private contacts: Contact[] = [];

  constructor(private http: HttpClient) { }

  getContacts(): void {
    this.http.get<Contact[]>('https://cms-project-af83b-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts || [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
          this.contactChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  getContact(id: string): Contact | null {
    const found = this.contacts.find(c => c.id === id);
    return found ? { ...found } : null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach(contact => {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    this.maxContactId++;
    contact.id = this.maxContactId.toString();
    this.contacts.push(contact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  storeContacts(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'https://cms-project-af83b-default-rtdb.firebaseio.com/contacts.json',
      JSON.stringify(this.contacts),
      { headers: headers }
    )
      .subscribe(() => {
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }
}