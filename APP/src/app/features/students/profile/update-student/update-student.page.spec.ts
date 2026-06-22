import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentPage } from './update-student.page';

describe('UpdateStudentPage', () => {
  let component: UpdateStudentPage;
  let fixture: ComponentFixture<UpdateStudentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudentPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateStudentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
