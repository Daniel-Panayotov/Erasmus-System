import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsOfEducationComponent } from './fields-of-education.component';

describe('FieldsOfEducationComponent', () => {
  let component: FieldsOfEducationComponent;
  let fixture: ComponentFixture<FieldsOfEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsOfEducationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldsOfEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
