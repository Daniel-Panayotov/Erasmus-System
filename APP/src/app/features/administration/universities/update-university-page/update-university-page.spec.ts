import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUniversityPage } from './update-university-page';

describe('UpdateUniversityPage', () => {
  let component: UpdateUniversityPage;
  let fixture: ComponentFixture<UpdateUniversityPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUniversityPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUniversityPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
