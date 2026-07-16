import { Component, inject, signal } from '@angular/core';
import { UniversityForm } from '../university-form/university-form';
import { UniversityService } from '../../services/university.service';
import { Router } from '@angular/router';
import { UniversityDataDTO } from '../../models/university.model';
import { administration } from '../../administration.paths';
import { UniversityStore } from '../university.store';
import { TreeValidationResult } from '@angular/forms/signals';

@Component({
  selector: 'app-create-university-page',
  imports: [UniversityForm],
  template: `<app-university-form
    [university]="university()"
    (save)="createUniversity($event)"
    (valueChange)="valueChange($event)"
    [serverErrors]="serverErrors()"
    (touched)="changeTouched($event)"
  />`,
})
export class CreateUniversityPage {
  private universityAPI = inject(UniversityService);
  private universityStore = inject(UniversityStore);
  private router = inject(Router);

  serverErrors = signal<TreeValidationResult | null>(null);

  university = this.universityStore.drafts.universityModel;
  draftTouched = this.universityStore.drafts.touched;

  changeTouched(touched: boolean) {
    if (this.draftTouched()) return;
    this.draftTouched.set(touched);
  }

  valueChange(data: UniversityDataDTO) {
    if (!this.draftTouched()) return;

    this.universityStore.drafts.universityModel.set(data);
  }

  createUniversity(data: UniversityDataDTO) {
    this.universityAPI.Create(data).subscribe({
      next: (v) => {
        this.universityStore.resetDrafts();
        this.router.navigate(administration.universities.view.segments);
      },
      error(err) {},
    });
  }
}
