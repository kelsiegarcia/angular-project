import { Component } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.html',
  styleUrls: ['./documents.css'],
})
export class Documents {
  selectedDocument: Document | null = null;

  constructor( private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.selectedDocument = documents[0] || null;
      }
    );
  }

}
