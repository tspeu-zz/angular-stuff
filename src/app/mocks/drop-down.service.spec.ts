import { TestBed } from '@angular/core/testing';

import { DropDownService } from './drop-down.service';

describe('DropDownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DropDownService = TestBed.get(DropDownService);
    expect(service).toBeTruthy();
  });
});
