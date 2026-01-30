import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.css'],
})
export class DocumentList {
  documents: Document[] = [];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = [
      { id: '1', name: 'Document 1', description: 'Description A', url: 'www.example.com/doc1', children: [] },
      { id: '2', name: 'Document 2', description: 'Description B', url: 'www.example.com/doc2', children: [] },
      { id: '3', name: 'Document 3', description: 'Description C', url: 'www.example.com/doc3', children: [] }
    ];
  }

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
