import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentsViewComponent } from './admin-students-view.component';

describe('AdminStudentsViewComponent', () => {
  let component: AdminStudentsViewComponent;
  let fixture: ComponentFixture<AdminStudentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStudentsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminStudentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
