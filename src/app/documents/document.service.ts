import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // In a real application, this would likely be fetched from an API
  // it would look like this.http.get<Document[]>('/api/documents');
  // This is a simple in-memory list of documents for demonstration purposes
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;

  documentChangedEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
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
    this.documentChangedEvent.next(this.documents.slice());
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
    this.documentChangedEvent.next(this.documents.slice());
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

    this.documentListChangedEvent.next(this.documents.slice());
  }
}
