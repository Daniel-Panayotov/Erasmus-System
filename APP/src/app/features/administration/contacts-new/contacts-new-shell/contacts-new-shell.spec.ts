import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsNewShell } from './contacts-new-shell';

describe('ContactsNewShell', () => {
  let component: ContactsNewShell;
  let fixture: ComponentFixture<ContactsNewShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsNewShell],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsNewShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
