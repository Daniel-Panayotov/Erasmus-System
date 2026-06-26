import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstitutionPage } from './create-institution.page';

describe('CreateInstitutionPage', () => {
  let component: CreateInstitutionPage;
  let fixture: ComponentFixture<CreateInstitutionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstitutionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateInstitutionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
