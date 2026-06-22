import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompetencyPage } from './update-competency.page';

describe('UpdateCompetencyPage', () => {
  let component: UpdateCompetencyPage;
  let fixture: ComponentFixture<UpdateCompetencyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCompetencyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCompetencyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
