import { Component } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.css'],
})
export class DocumentList {
  documents: Document[] = [];
  constructor(private DocumentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.DocumentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.DocumentService.documentSelectedEvent.emit(document);
  }

}
