import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignContactsComponent } from './foreign-contacts.component';

describe('ForeignContactsComponent', () => {
  let component: ForeignContactsComponent;
  let fixture: ComponentFixture<ForeignContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForeignContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForeignContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
