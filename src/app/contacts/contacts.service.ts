import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private contacts: Contact[] = [
        new Contact('1', 'John Smith', 'john.smith@email.com', '808-555-1234', 
            'https://picsum.photos/60', []),
        new Contact('2', 'Jo Smith', 'jo.smith@email.com', '808-555-5678', 'https://picsum.photos/70', [])
    ];

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: string) {
        return this.contacts.find(c => c.id === id) || null;
    }
}