import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineForm } from './discipline.form';

describe('DisciplineForm', () => {
  let component: DisciplineForm;
  let fixture: ComponentFixture<DisciplineForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplineForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DisciplineForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
