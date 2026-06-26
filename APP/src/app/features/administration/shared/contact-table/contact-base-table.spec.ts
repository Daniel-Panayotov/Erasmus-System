import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTable } from './contact-table';

describe('ContactTable', () => {
  let component: ContactTable;
  let fixture: ComponentFixture<ContactTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
