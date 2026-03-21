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
  messageSender: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    if (!this.message || !this.message.sender) {
      this.messageSender = '';
      return;
    }

    console.log('message =', this.message);
    console.log('sender =', this.message.sender);

    if (typeof this.message.sender === 'object') {
      this.messageSender = this.message.sender.name || '';
      return;
    }

    const contact: Contact | null = this.contactService.getContact(this.message.sender);
    this.messageSender = contact ? contact.name : this.message.sender;
  }
}