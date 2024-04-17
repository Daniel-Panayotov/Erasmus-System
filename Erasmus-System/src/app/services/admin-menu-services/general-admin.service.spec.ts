import { TestBed } from '@angular/core/testing';

import { GeneralAdminService } from './general-admin.service';

describe('GeneralAdminService', () => {
  let service: GeneralAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
