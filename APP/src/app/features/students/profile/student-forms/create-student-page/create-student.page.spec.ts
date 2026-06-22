import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentPage } from './create-student.page';

describe('CreateStudentPage', () => {
  let component: CreateStudentPage;
  let fixture: ComponentFixture<CreateStudentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStudentPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStudentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
