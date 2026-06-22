import { Component, input, output, signal } from '@angular/core';
import {
  LanguageCompetencyBase,
  LanguageCompetencyData,
  LanguageCompetencyFormModel,
} from '../../models/language-competency.model';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  required,
  TreeValidationResult,
} from '@angular/forms/signals';

@Component({
  selector: 'app-language-competency-form',
  imports: [FormRoot, FormField],
  templateUrl: './language-competency.form.html',
  styleUrl: './language-competency.form.css',
})
export class LanguageCompetencyForm {
  competency = input<LanguageCompetencyBase>();
  serverErrors = input<TreeValidationResult | null>();
  save = output<LanguageCompetencyData>();

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

          this.save.emit(formData);
        },
      },
    },
  );

  ngOnInit() {
    if (!this.competency()) return;

    const competencyData: LanguageCompetencyFormModel = {
      ...(this.competency() as LanguageCompetencyBase),
    };

    this.competencyForm().controlValue.set(competencyData);
  }
}
