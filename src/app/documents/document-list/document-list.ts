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
      {
        id: '1',
        name: 'CIT 260 - Object Oriented Programming',
        description: 'Learn object-oriented programming principles and design.',
        url: 'https://content.byui.edu/file/b7c35ed-6947-497f-9d32-45b5b397aca1/cit260-course-description.pdf',
        children: []
      },
      {
        id: '2',
        name: 'CIT 366 - Full Web Stack Development',
        description: 'Learn how to develop modern web applications using the MEAN stack.',
        url: 'https://content.byui.edu/file/b7c35ed-6947-497f-9d32-45b5b397aca1/cit366-course-description.pdf',
        children: []
      },
      {
        id: '3',
        name: 'CIT 425 - Data Warehousing',
        description: 'Introduction to data warehousing concepts and analytics.',
        url: 'https://content.byui.edu/file/b7c35ed-6947-497f-9d32-45b5b397aca1/cit425-course-description.pdf',
        children: []
      },
      {
        id: '4',
        name: 'CIT 460 - Enterprise Development',
        description: 'Enterprise-level application development and architecture.',
        url: 'https://content.byui.edu/file/b7c35ed-6947-497f-9d32-45b5b397aca1/cit460-course-description.pdf',
        children: []
      },
      {
        id: '5',
        name: 'CIT 495 - Senior Practicum',
        description: 'Capstone practicum applying real-world software development skills.',
        url: 'https://content.byui.edu/file/b7c35ed-6947-497f-9d32-45b5b397aca1/cit495-course-description.pdf',
        children: []
      }
    ];
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
