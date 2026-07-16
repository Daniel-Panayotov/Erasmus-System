import { Component, effect, inject, input, signal } from '@angular/core';
import { UniversityForm } from '../university-form/university-form';
import { UniversityService } from '../../services/university.service';
import { Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { UniversityBaseDTO, UniversityDataDTO } from '../../models/university.model';
import { CanDeactivateFormInterface } from '../../../../core/guards/form.guard';
import { administration } from '../../administration.paths';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-university-page',
  imports: [UniversityForm],
  templateUrl: './update-university-page.html',
})
export class UpdateUniversityPage implements CanDeactivateFormInterface {
  private universityAPI = inject(UniversityService);
  private router = inject(Router);

  universityID = input.required<number>();

  canDeactivate = signal(true);

  serverErrors = signal<TreeValidationResult | null>(null);

  universityResource = rxResource({
    params: () => ({ universityID: this.universityID() }),
    stream: ({ params }) =>
      this.universityAPI.GetOne(params.universityID).pipe(map((u) => u.body as UniversityBaseDTO)),
  });
  universitySignal = signal<UniversityDataDTO | null>(null);

  updateUniversity(data: UniversityDataDTO) {
    this.universityAPI.Update(this.universityID(), data).subscribe({
      next: () => {
        this.canDeactivate.set(true);
        this.router.navigateByUrl(administration.universities.view.url);
      },
      error(err: HttpErrorResponse) {
        console.log(err);
      },
    });
  }

  constructor() {
    effect(() => {
      this.universityResource.hasValue()
        ? this.universitySignal.set(this.universityResource.value().dataDTO)
        : this.universitySignal.set(null);
    });
  }
}
