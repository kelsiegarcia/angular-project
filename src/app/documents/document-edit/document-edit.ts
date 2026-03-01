import { Component, OnInit } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrls: ['./document-edit.css'],
})
export class DocumentEdit implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(this.id);
      if (!this.originalDocument) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm): void {
    const value = form.value;

    const newDocument = new Document(
      this.editMode ? this.originalDocument.id : '',
      value.name,
      value.description,
      value.url,
      this.editMode ? this.originalDocument.children : []
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    // route back to /documents url
    this.router.navigate(['/documents']);
  }
}
