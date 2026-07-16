import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityForm } from './university-form';

describe('UniversityForm', () => {
  let component: UniversityForm;
  let fixture: ComponentFixture<UniversityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UniversityForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
