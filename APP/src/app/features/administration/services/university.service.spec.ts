import { TestBed } from '@angular/core/testing';

import { UniversityService } from './university.service';

describe('University', () => {
  let service: UniversityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
