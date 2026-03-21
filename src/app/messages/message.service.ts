import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  // maxMessageId: number = 0;

  constructor(private http: HttpClient) { }

  getMessages(): void {
    this.http
      .get<{ message: string; messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (response) => {
          this.messages = response.messages;
          this.messages.sort((a, b) => (a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0));
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error('Error fetching messages:', error);
        },
      );
  }

  getMessage(id: string): Message | null {
    return this.messages.find((message) => message.id === id) || null;
  }

  addMessage(message: Message): void {
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; messageObject: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.messages.push(responseData.messageObject);
        this.messages.sort((a, b) =>
          a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0
        );
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex((d) => d.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/messages/' + originalMessage.id, newMessage, {
        headers: headers,
      })
      .subscribe(() => {
        this.messages[pos] = newMessage;
        this.messages.sort((a, b) => (a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0));
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex((d) => d.id === message.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/messages/' + message.id).subscribe(() => {
      this.messages.splice(pos, 1);
      this.messages.sort((a, b) => (a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0));
      this.messageChangedEvent.next(this.messages.slice());
    });
  }


  // storeMessages(): void {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   this.http
  //     .put(
  //       'https://cms-project-af83b-default-rtdb.firebaseio.com/messages.json',
  //       JSON.stringify(this.messages),
  //       { headers: headers },
  //     )
  //     .subscribe(() => {
  //       this.messageChangedEvent.emit(this.messages.slice());
  //     });
  // }

  // getMaxId(): number {
  //   let maxId = 0;

  //   for (const message of this.messages) {
  //     const currentId = Number(message.id);
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }

  //   return maxId;
  // }
}
