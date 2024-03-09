import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAdminFormComponent } from './popup-admin-form.component';

describe('PopupAdminFormComponent', () => {
  let component: PopupAdminFormComponent;
  let fixture: ComponentFixture<PopupAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAdminFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
