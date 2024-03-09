import { TestBed } from '@angular/core/testing';

import { AdminPopupService } from './admin-popup.service';

describe('AdminPopupService', () => {
  let service: AdminPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
