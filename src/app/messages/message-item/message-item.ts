import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrls: ['./message-item.css'],
})
export class MessageItem {
  @Input() message!: Message;

}
