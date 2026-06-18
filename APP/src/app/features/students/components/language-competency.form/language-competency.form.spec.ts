import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCompetencyForm } from './language-competency.form';

describe('LanguageCompetencyForm', () => {
  let component: LanguageCompetencyForm;
  let fixture: ComponentFixture<LanguageCompetencyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageCompetencyForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageCompetencyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
