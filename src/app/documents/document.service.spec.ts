import { TestBed } from '@angular/core/testing';

import { Document } from './documents.model';

describe('Document', () => {
  let service: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Document);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
