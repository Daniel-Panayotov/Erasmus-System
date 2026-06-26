import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsShell } from './institutions-shell';

describe('InstitutionsShell', () => {
  let component: InstitutionsShell;
  let fixture: ComponentFixture<InstitutionsShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsShell],
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionsShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
