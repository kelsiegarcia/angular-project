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
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }
}
