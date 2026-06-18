import { TestBed } from '@angular/core/testing';

import { ApplicationAPI } from './application.api.service';

describe('ApplicationApi', () => {
  let service: ApplicationAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
