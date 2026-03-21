import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrls: ['./message-edit.css'],
})
export class MessageEdit {
  @ViewChild('subject', { static: false }) subjectInput!: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInput!: ElementRef;

  currentSender = '1';

  constructor(private messageService: MessageService) { }

  onSendMessage(): void {
    const subject = this.subjectInput.nativeElement.value.trim();
    const msgText = this.msgTextInput.nativeElement.value.trim();

    if (!subject || !msgText) {
      return;
    }

    const newMessage = new Message('', subject, msgText, this.currentSender);

    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear(): void {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }
}