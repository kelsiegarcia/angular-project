import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http.get<Document[]>('https://cms-project-af83b-default-rtdb.firebaseio.com/documents.json')
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
        this.documentListChangedEvent.next(this.documents.slice());
      },
        (error: any) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  getDocument(id: string): Document | null {
    const index = this.documents.findIndex(d => d.id === id);
    return index !== -1 ? { ...this.documents[index] } : null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach(document => {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    this.maxDocumentId++;
    document.id = this.maxDocumentId.toString();
    this.documents.push(document);
    this.storeDocuments();  
  }

  updateDocument(document: Document, newDocument: Document) {
    if (!document || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }
    
    newDocument.id = document.id;

    this.documents[pos] = newDocument;
    this.storeDocuments();;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);

    this.storeDocuments();
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'https://cms-project-af83b-default-rtdb.firebaseio.com/documents.json',
        JSON.stringify(this.documents),
        { headers: headers }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
