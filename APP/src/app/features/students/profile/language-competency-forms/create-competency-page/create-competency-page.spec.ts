import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompetencyPage } from './create-competency-page';

describe('CreateCompetencyPage', () => {
  let component: CreateCompetencyPage;
  let fixture: ComponentFixture<CreateCompetencyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCompetencyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCompetencyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
