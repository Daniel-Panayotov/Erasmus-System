import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DraftCompetencyTable } from './draft-competency-table';

describe('DraftCompetencyTable', () => {
  let component: DraftCompetencyTable;
  let fixture: ComponentFixture<DraftCompetencyTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftCompetencyTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftCompetencyTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
