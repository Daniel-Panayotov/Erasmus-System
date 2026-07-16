import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityBaseTable } from './university-base-table';

describe('UniversityBaseTable', () => {
  let component: UniversityBaseTable;
  let fixture: ComponentFixture<UniversityBaseTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityBaseTable],
    }).compileComponents();

    fixture = TestBed.createComponent(UniversityBaseTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
