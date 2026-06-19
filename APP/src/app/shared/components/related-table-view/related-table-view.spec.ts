import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedTableView } from './related-table-view';

describe('RelatedTableView', () => {
  let component: RelatedTableView;
  let fixture: ComponentFixture<RelatedTableView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedTableView],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedTableView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
