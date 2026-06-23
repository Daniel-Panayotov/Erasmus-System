import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableView } from './data-table-view';

describe('DataTableView', () => {
  let component: DataTableView;
  let fixture: ComponentFixture<DataTableView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableView],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
