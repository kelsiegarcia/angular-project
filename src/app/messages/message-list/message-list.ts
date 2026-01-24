import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrls: ['./message-list.css'],
})

export class MessageList {

  messages: Message[] = [
    new Message(
      'm1',
      'Hello World',
      'This is the first message',
      'Kelsie Garcia'
    ),
    new Message(
      'm2',
      'Update',
      'I pushed my changes',
      'Sam'
    ),
    new Message(
      'm3',
      'Question',
      'Are we meeting today?',
      'Jane'
    ),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
