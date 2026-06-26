import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsBaseTable } from './institutions-base-table';

describe('InstitutionsBaseTable', () => {
  let component: InstitutionsBaseTable;
  let fixture: ComponentFixture<InstitutionsBaseTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsBaseTable],
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionsBaseTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
