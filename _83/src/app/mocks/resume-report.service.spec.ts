import { TestBed } from '@angular/core/testing';

import { ResumeReportService } from './resume-report.service';

describe('ResumeReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResumeReportService = TestBed.get(ResumeReportService);
    expect(service).toBeTruthy();
  });
});
