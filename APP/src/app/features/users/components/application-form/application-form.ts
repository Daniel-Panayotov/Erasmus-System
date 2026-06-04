import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, pattern, required } from '@angular/forms/signals';
import { ApplicationFormModel } from '../../models/application-form.models';
import { ApplicationPatterns } from '../../../../shared/utils/patterns';

@Component({
  selector: 'app-application-form',
  imports: [FormRoot, FormField],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css',
})
export class ApplicationForm {
  constructor() {}
  formModel = signal<ApplicationFormModel>({
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
      required(schemaPath.mobilityType, { message: 'Mobility type is required.' });
      pattern(schemaPath.mobilityType, ApplicationPatterns.mobilityType, {
        message: 'Invalid Mobility type.',
      });

      required(schemaPath.degree, { message: 'Degree is required' });
      pattern(schemaPath.degree, ApplicationPatterns.degree, { message: 'Invalid degree.' });

      required(schemaPath.studyFrom, { message: 'Study start is required' });
      required(schemaPath.studyTo, { message: 'Study end is required.' });

      required(schemaPath.accommodation, { message: 'Accommodation choice is required.' });

      required(schemaPath.bulgarianCourse, { message: 'Bulgarian course choice is required.' });

      maxLength(schemaPath.motivationText, 500, {
        message: 'Motivation text character limit of 500.',
      });
      pattern(schemaPath.motivationText, ApplicationPatterns.motivationText, {
        message: 'Invalid characters used.',
      });

      required(schemaPath.priorStudyAbroad, { message: '' });
    },
    {
      submission: { action: async (detail) => {} },
    },
  );
}
