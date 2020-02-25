import { TestBed } from '@angular/core/testing';

import { AffiliatesService } from './affiliates.service';

describe('AffiliatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AffiliatesService = TestBed.get(AffiliatesService);
    expect(service).toBeTruthy();
  });
});
