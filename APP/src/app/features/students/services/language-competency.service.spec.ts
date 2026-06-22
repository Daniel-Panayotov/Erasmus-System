import { TestBed } from '@angular/core/testing';

import { LanguageCompetencyService } from './language-competency.service';

describe('LanguageCompetency', () => {
  let service: LanguageCompetencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageCompetencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
