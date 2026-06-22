import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftUpdateCompetencyPage } from './draft-update-competency.page';

describe('DraftUpdateCompetencyPage', () => {
  let component: DraftUpdateCompetencyPage;
  let fixture: ComponentFixture<DraftUpdateCompetencyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftUpdateCompetencyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftUpdateCompetencyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
