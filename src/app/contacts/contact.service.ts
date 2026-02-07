import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    // assign the EventEmitter to a property named contactSelectedEvent
    contactSelectedEvent = new EventEmitter<Contact>();


    contacts: Contact[] = [];

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id: string): Contact | null {
        return this.contacts.find(c => c.id === id) || null;
    }
}