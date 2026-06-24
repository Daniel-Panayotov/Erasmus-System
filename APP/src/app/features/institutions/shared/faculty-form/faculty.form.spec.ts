import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyForm } from './faculty.form';

describe('FacultyForm', () => {
  let component: FacultyForm;
  let fixture: ComponentFixture<FacultyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FacultyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
