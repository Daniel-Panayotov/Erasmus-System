import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftCreateCompetencyPage } from './draft-create-competency.page';

describe('DraftCreateCompetencyPage', () => {
  let component: DraftCreateCompetencyPage;
  let fixture: ComponentFixture<DraftCreateCompetencyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftCreateCompetencyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftCreateCompetencyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
