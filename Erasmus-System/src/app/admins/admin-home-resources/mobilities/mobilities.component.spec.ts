import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilitiesComponent } from './mobilities.component';

describe('MobilitiesComponent', () => {
  let component: MobilitiesComponent;
  let fixture: ComponentFixture<MobilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
