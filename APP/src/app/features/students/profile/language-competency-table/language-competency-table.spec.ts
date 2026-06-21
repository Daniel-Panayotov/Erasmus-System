import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCompetencyTable } from './language-competency-table';

describe('LanguageCompetencyTable', () => {
  let component: LanguageCompetencyTable;
  let fixture: ComponentFixture<LanguageCompetencyTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageCompetencyTable],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageCompetencyTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
