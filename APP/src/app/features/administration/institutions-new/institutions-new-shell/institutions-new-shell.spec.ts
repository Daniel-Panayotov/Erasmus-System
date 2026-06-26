import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsNewShell } from './institutions-new-shell';

describe('InstitutionsNewShell', () => {
  let component: InstitutionsNewShell;
  let fixture: ComponentFixture<InstitutionsNewShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsNewShell],
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionsNewShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
