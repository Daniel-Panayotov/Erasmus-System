import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContactPage } from './update-contact.page';

describe('UpdateContactPage', () => {
  let component: UpdateContactPage;
  let fixture: ComponentFixture<UpdateContactPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateContactPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateContactPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
