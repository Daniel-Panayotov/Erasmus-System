import { TestBed } from '@angular/core/testing';

import { StudentAPI } from './student.api.service';

describe('ProfileFormApiService', () => {
  let service: StudentAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
