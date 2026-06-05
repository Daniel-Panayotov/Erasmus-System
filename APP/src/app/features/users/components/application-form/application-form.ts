import { Component, signal } from '@angular/core';
import {
  disabled,
  form,
  FormField,
  FormRoot,
  maxLength,
  pattern,
  required,
} from '@angular/forms/signals';
import { ApplicationFormModel } from '../../models/application-form.models';
import { ApplicationPatterns } from '../../../../shared/utils/patterns';

@Component({
  selector: 'app-application-form',
  imports: [FormRoot, FormField],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css',
})
export class ApplicationForm {
  formModel = signal<ApplicationFormModel>({
    photo: null,

    mobilityType: '',

    studyFrom: null,
    studyTo: null,

    accommodation: false,
    accommodationFrom: null,
    accommodationTo: null,

    bulgarianCourse: false,
    motivationText: '',

    degree: '',

    priorStudyAbroad: false,
    priorStudyDurationMonths: null,
  });

  applicationForm = form(
    this.formModel,
    (schemaPath) => {
      required(schemaPath.photo, { message: 'Photo is required.' });

      required(schemaPath.mobilityType, { message: 'Mobility type is required.' });
      pattern(schemaPath.mobilityType, ApplicationPatterns.mobilityType, {
        message: 'Invalid Mobility type.',
      });

      required(schemaPath.degree, { message: 'Degree is required' });
      pattern(schemaPath.degree, ApplicationPatterns.degree, { message: 'Invalid degree.' });

      required(schemaPath.studyFrom, { message: 'Study start is required' });
      required(schemaPath.studyTo, { message: 'Study end is required.' });

      required(schemaPath.accommodation, { message: 'Accommodation choice is required.' });

      disabled(schemaPath.accommodationFrom, {
        when: ({ valueOf }) => valueOf(schemaPath.accommodation) == false,
      });
      disabled(schemaPath.accommodationTo, {
        when: ({ valueOf }) => valueOf(schemaPath.accommodation) == false,
      });
      required(schemaPath.bulgarianCourse, { message: 'Bulgarian course choice is required.' });

      maxLength(schemaPath.motivationText, 500, {
        message: 'Motivation text character limit of 500.',
      });
      pattern(schemaPath.motivationText, ApplicationPatterns.motivationText, {
        message: 'Invalid characters used.',
      });

      required(schemaPath.priorStudyAbroad, { message: 'Prior study abroad choice is required.' });
      disabled(schemaPath.priorStudyDurationMonths, {
        when: ({ valueOf }) => valueOf(schemaPath.priorStudyAbroad) == false,
      });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;
        },
      },
    },
  );

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0] ?? null;

    this.applicationForm.photo().value.set(file);
  }
}
