import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionForm } from './institution.form';

describe('InstitutionForm', () => {
  let component: InstitutionForm;
  let fixture: ComponentFixture<InstitutionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
