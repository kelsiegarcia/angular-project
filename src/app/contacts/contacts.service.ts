import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private contacts: Contact[] = [
        new Contact('1', 'Kelsie Garcia', 'kelsie@email.com', '808-555-1234', 'https://via.placeholder.com/150', []),
        new Contact('2', 'Cole', 'cole@email.com', '808-555-5678', 'https://via.placeholder.com/150', [])
    ];

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: string) {
        return this.contacts.find(c => c.id === id) || null;
    }
}