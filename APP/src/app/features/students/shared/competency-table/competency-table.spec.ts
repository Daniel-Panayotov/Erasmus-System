import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyTable } from './competency-table';

describe('CompetencyTable', () => {
  let component: CompetencyTable;
  let fixture: ComponentFixture<CompetencyTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetencyTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetencyTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
