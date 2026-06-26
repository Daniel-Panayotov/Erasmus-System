import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstitutionPage } from './update-institution.page';

describe('UpdateInstitutionPage', () => {
  let component: UpdateInstitutionPage;
  let fixture: ComponentFixture<UpdateInstitutionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInstitutionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateInstitutionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
