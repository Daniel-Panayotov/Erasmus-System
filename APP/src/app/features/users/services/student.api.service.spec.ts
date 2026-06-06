import { TestBed } from '@angular/core/testing';

import { StudentApiService } from './student.api.service';

describe('ProfileFormApiService', () => {
  let service: StudentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
