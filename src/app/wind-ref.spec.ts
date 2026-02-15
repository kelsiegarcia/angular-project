import { TestBed } from '@angular/core/testing';

import { WindRef } from './wind-ref';

describe('WindRef', () => {
  let service: WindRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
