import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUniversityPage } from './create-university-page';

describe('CreateUniversityPage', () => {
  let component: CreateUniversityPage;
  let fixture: ComponentFixture<CreateUniversityPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUniversityPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUniversityPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
