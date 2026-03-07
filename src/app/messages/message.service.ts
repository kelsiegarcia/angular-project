import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    this.http.get<Message[]>('https://cms-project-af83b-default-rtdb.firebaseio.com/messages.json')
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.messages.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
        this.messageChangedEvent.emit(this.messages.slice());
      },
        (error: any) => {
          console.error('Error fetching messages:', error);
        }
      );
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    return this.messages.find(m => m.id === id) || null;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }

  storeMessages(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'https://cms-project-af83b-default-rtdb.firebaseio.com/messages.json',
        JSON.stringify(this.messages),
        { headers: headers }
      )
      .subscribe(() => {
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }
}
