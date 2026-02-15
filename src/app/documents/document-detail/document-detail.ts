import { Component } from '@angular/core';
import { Document } from '../documents.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrls: ['./document-detail.css'],
})
export class DocumentDetail {
  document: Document | null = null;

  nativeWindow: any;

  constructor (
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private windRef: WindRefService
  ) {
    this.nativeWindow = this.windRef.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onView(): void {
    const url = this.document?.url;
    if (url) {
      this.nativeWindow.open(url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

} 
