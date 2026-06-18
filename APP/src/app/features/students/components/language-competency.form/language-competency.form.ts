import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LanguageCompetencyData,
  LanguageCompetencyFormModel,
} from '../../models/language-competency.form.model';
import { form, FormField, FormRoot, maxLength, required } from '@angular/forms/signals';
import { LanguageCompetencyAPI } from '../../services/language-competency.api.service';

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

  userID = this.route.snapshot.params['userID'];

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
        },
      },
    },
  );

  constructor() {
    if (!this.isUpdate || !this.competencyID) return;

    // this.languageAPI.GetAll(stude)
  }
}
