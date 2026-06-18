import { TestBed } from '@angular/core/testing';

import { LanguageCompetencyAPI } from './language-competency.api.service';

describe('LanguageCompetency', () => {
  let service: LanguageCompetencyAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageCompetencyAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
