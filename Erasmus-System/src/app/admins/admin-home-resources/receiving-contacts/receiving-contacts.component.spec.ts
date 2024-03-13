import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingContactsComponent } from './receiving-contacts.component';

describe('ReceivingContactsComponent', () => {
  let component: ReceivingContactsComponent;
  let fixture: ComponentFixture<ReceivingContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivingContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceivingContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
