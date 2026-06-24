import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectDataTable } from './multi-select-data-table';

describe('MultiSelectDataTable', () => {
  let component: MultiSelectDataTable;
  let fixture: ComponentFixture<MultiSelectDataTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectDataTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectDataTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
