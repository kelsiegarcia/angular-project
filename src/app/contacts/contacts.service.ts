import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private contacts: Contact[] = [
        new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 
            'assets/images/jacksonk.jpg', []),
        new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 'assets/images/barzeer.jpg', [])
    ];

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: string) {
        return this.contacts.find(c => c.id === id) || null;
    }
}