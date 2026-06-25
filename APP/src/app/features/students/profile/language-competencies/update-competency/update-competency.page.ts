import { Component, inject, input, signal } from '@angular/core';
import { TreeValidationResult } from '@angular/forms/signals';
import { LanguageCompetencyService } from '../../../services/language-competency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  LanguageCompetencyBase,
  LanguageCompetencyData,
} from '../../../models/language-competency.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LanguageCompetencyForm } from '../../../shared/language-competency-form/language-competency.form';

@Component({
  selector: 'app-update-competency-page',
  imports: [LanguageCompetencyForm],
  templateUrl: './update-competency.page.html',
})
export class UpdateCompetencyPage {
  private languageAPI = inject(LanguageCompetencyService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  studentID = input.required<number>();
  competencyID = input.required<number>();

  serverErrors = signal<TreeValidationResult | null>(null);

  competencyResource = rxResource({
    params: () => ({ studentID: this.studentID(), competencyID: this.competencyID() }),
    stream: ({ params }) =>
      this.languageAPI.GetAll(params.studentID).pipe(
        map((res) => {
          const competencies = res.body as LanguageCompetencyBase[];

          const filteredCompetencies = competencies.filter(
            (v) => v.languageCompetencyID == params.competencyID,
          );

          if (filteredCompetencies.length == 0) return;

          return filteredCompetencies[0];
        }),
      ),
  });

  updateCompetency(data: LanguageCompetencyData) {
    this.languageAPI.Update(this.competencyID(), data).subscribe({
      next: () => this.router.navigate(['../..'], { relativeTo: this.route }),
      error(err: HttpErrorResponse) {},
    });
  }
}
