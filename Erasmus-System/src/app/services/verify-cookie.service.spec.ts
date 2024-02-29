import { TestBed } from '@angular/core/testing';

import { VerifyCookieService } from './verify-cookie.service';

describe('VerifyCookieService', () => {
  let service: VerifyCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
