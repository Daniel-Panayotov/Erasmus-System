import { TestBed } from '@angular/core/testing';

import { FieldsOfEducationService } from './fields-of-education.service';

describe('FieldsOfEducationService', () => {
  let service: FieldsOfEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldsOfEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
