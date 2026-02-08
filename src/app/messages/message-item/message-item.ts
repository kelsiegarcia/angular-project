import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrls: ['./message-item.css'],
})
export class MessageItem {
  @Input() message!: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // Attempt to find the contact based on the sender ID
    const contact: Contact | null = this.contactService.getContact(this.message.sender);
    // If the contact exists, use its name; otherwise, use the sender ID
    this.messageSender = contact ? contact.name : this.message.sender;
  }

}
