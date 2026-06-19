import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LanguageCompetencyBase,
  LanguageCompetencyData,
  LanguageCompetencyFormModel,
} from '../../models/language-competency.form.model';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  required,
  TreeValidationResult,
} from '@angular/forms/signals';
import { LanguageCompetencyAPI } from '../../services/language-competency.api.service';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-language-competency.form',
  imports: [FormRoot, FormField],
  templateUrl: './language-competency.form.html',
  styleUrl: './language-competency.form.css',
})
export class LanguageCompetencyForm {
  private languageAPI = inject(LanguageCompetencyAPI);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  studentID = this.route.snapshot.params['studentID'];

  isUpdate = this.route.snapshot.url[0].path == 'update';
  competencyID = this.route.snapshot.params['competencyID'] ?? null;

  formModel = signal<LanguageCompetencyFormModel>({
    language: '',
    canFollowLectures: false,
    canFollowLecturesWithLessons: false,
  });

  competencyForm = form(
    this.formModel,
    (schemaPath) => {
      required(schemaPath.language, { message: 'Language is required.' });
      maxLength(schemaPath.language, 50, {
        message: 'Language has a maximum length of 50 characters.',
      });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;
          const formData = detail().value() as LanguageCompetencyData;

          let result: TreeValidationResult | null = null;

          if (this.isUpdate)
            this.languageAPI.Update(this.competencyID, formData).subscribe({
              error(err: HttpErrorResponse) {
                result = { kind: 'serverError', message: err.error };
              },
            });
          else
            this.languageAPI.Create(this.studentID, formData).subscribe({
              error(err: HttpErrorResponse) {
                result = { kind: 'serverError', message: err.error };
              },
            });

          if (result != null) return result;

          await this.router.navigateByUrl('/');
        },
      },
    },
  );

  constructor() {
    if (!this.isUpdate || !this.competencyID) return;

    this.languageAPI
      .GetAll(this.studentID)
      .pipe(
        catchError((err) => {
          this.router.navigateByUrl('');
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        const competencies = res.body as LanguageCompetencyBase[];

        const filteredCompetencies = competencies.filter(
          (v) => v.languageCompetencyID == this.competencyID,
        );

        if (filteredCompetencies.length == 0) return;

        const competencyData: LanguageCompetencyFormModel = { ...filteredCompetencies[0] };

        this.competencyForm().controlValue.set(competencyData);
      });
  }
}
