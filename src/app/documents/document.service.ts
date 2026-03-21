import { Injectable } from '@angular/core';
import { Document } from './documents.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];

  constructor(private http: HttpClient) { }


  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (response) => {
          this.documents = response.documents;
          // this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error fetching documents:', error);
        },
      );
  }

  getDocument(id: string): Document | null {
    const index = this.documents.findIndex((d) => d.id === id);
    return index !== -1 ? { ...this.documents[index] } : null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((document) => {
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

    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.documents.push(responseData.document);
        this.documents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/documents/' + originalDocument.id, newDocument, {
        headers: headers,
      })
      .subscribe(() => {
        this.documents[pos] = newDocument;
        this.documents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id).subscribe(() => {
      this.documents.splice(pos, 1);
      this.documents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

}
