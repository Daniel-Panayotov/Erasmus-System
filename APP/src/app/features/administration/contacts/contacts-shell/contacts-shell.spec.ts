import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsShell } from './contacts-shell';

describe('ContactsShell', () => {
  let component: ContactsShell;
  let fixture: ComponentFixture<ContactsShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsShell],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
