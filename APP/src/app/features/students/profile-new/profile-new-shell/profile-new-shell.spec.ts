import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNewShell } from './profile-new-shell';

describe('ProfileNewShell', () => {
  let component: ProfileNewShell;
  let fixture: ComponentFixture<ProfileNewShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNewShell],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileNewShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
