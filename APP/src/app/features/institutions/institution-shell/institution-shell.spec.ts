import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionShell } from './institution-shell';

describe('InstitutionShell', () => {
  let component: InstitutionShell;
  let fixture: ComponentFixture<InstitutionShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionShell],
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
