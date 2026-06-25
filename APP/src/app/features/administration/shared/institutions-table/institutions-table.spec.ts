import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsTable } from './institutions-table';

describe('InstitutionsTable', () => {
  let component: InstitutionsTable;
  let fixture: ComponentFixture<InstitutionsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
