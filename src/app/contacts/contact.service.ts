import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    contactSelectedEvent = new Subject<Contact>();
    contactChangedEvent = new Subject<Contact[]>();

    private maxContactId: number;
    private contacts: Contact[] = [];

    constructor(private http: HttpClient) {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    getContacts(): Contact[] {
        this.http.get<Contact[]>('https://cms-project-af83b-default-rtdb.firebaseio.com/contacts.json')
          .subscribe((contacts: Contact[]) => {
            this.contacts = contacts;
            this.contacts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
            this.contactChangedEvent.next(this.contacts.slice());
          },
            (error: any) => {
              console.error('Error fetching contacts:', error);
            }
          );        
        return this.contacts.slice();
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

    addContact(contact: Contact) {
        if (!contact) {
            return;
        }
        this.maxContactId++;
        contact.id = this.maxContactId.toString();
        this.contacts.push(contact);
        const contactsListClone = this.contacts.slice();
        this.contactChangedEvent.next(contactsListClone);
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
        }

        const pos = this.contacts.findIndex(c => c.id === originalContact.id);
        if (pos < 0) {
            return;
        }

        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        const contactsListClone = this.contacts.slice();
        this.contactChangedEvent.next(contactsListClone);
    }

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }

        const pos = this.contacts.findIndex(c => c.id === contact.id);
        if (pos < 0) {
            return;
        }

        this.contacts.splice(pos, 1);
        const contactsListClone = this.contacts.slice();
        this.contactChangedEvent.next(contactsListClone);
    }

    storeContacts() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        this.http
            .put(
                'https://cms-project-af83b-default-rtdb.firebaseio.com/contacts.json',
                JSON.stringify(this.contacts),
                { headers: headers }
            )
            .subscribe(() => {
                this.contactChangedEvent.next(this.contacts.slice());
            });
    }   
}