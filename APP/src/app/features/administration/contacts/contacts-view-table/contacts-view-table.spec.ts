import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsViewTable } from './contacts-view-table';

describe('ContactsViewTable', () => {
  let component: ContactsViewTable;
  let fixture: ComponentFixture<ContactsViewTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsViewTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsViewTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
