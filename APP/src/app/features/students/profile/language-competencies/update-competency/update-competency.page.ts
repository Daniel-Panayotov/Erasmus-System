import { Component, inject, input, signal } from '@angular/core';
import { TreeValidationResult } from '@angular/forms/signals';
import { LanguageCompetencyService } from '../../../services/language-competency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  LanguageCompetency,
  LanguageCompetencyFormModel,
} from '../../../models/language-competency.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LanguageCompetencyForm } from '../../../shared/language-competency-form/language-competency.form';
import { CanDeactivateFormInterface } from '../../../../../core/guards/form.guard';

@Component({
  selector: 'app-update-competency-page',
  imports: [LanguageCompetencyForm],
  templateUrl: './update-competency.page.html',
})
export class UpdateCompetencyPage implements CanDeactivateFormInterface {
  private languageAPI = inject(LanguageCompetencyService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  studentID = input.required<number>();
  competencyID = input.required<number>();

  canDeactivate = signal(true);

  serverErrors = signal<TreeValidationResult | null>(null);

  certificateUrl = signal<string | null>(null);

  competencyResource = rxResource({
    params: () => ({ competencyID: this.competencyID() }),
    stream: ({ params }) =>
      this.languageAPI.GetOne(params.competencyID).pipe(
        map((v) => {
          const body = v.body as LanguageCompetency;

          if (body.certificateBase)
            this.certificateUrl.set(this.languageAPI.certificateUrl(body.languageCompetencyID));

          return {
            language: body.language,
            competencyLevel: body.competencyLevel,
            certificate: null,
            canFollowLectures: body.canFollowLectures,
            canFollowLecturesWithLessons: body.canFollowLecturesWithLessons,
          } as LanguageCompetencyFormModel;
        }),
      ),
  });

  updateCompetency(data: LanguageCompetencyFormModel) {
    this.languageAPI.Update(this.competencyID(), data).subscribe({
      next: () => {
        this.canDeactivate.set(true);
        this.router.navigate(['../..'], { relativeTo: this.route });
      },
      error(err: HttpErrorResponse) {},
    });
  }
}
