import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrls: ['./message-list.css'],
})
export class MessageList implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription!: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.subscription = this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });

    this.messageService.getMessages();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
