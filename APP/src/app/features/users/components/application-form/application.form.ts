import { Component, inject, signal } from '@angular/core';
import {
  disabled,
  form,
  FormField,
  FormRoot,
  maxLength,
  pattern,
  required,
} from '@angular/forms/signals';
import { ApplicationData, ApplicationFormModel } from '../../models/application.form.models';
import { ApplicationPatterns } from '../../../../shared/utils/patterns';
import { ApplicationAPI } from '../../services/application.api.service';
import { AuthenticationService } from '../../../authentication/services/authentication-service';

@Component({
  selector: 'app-application-form',
  imports: [FormRoot, FormField],
  templateUrl: './application.form.html',
  styleUrl: './application.form.css',
})
export class ApplicationForm {
  private applicationAPI = inject(ApplicationAPI);
  private auth = inject(AuthenticationService);

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
    priorStudyDuration: null,
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

      disabled(schemaPath.accommodationFrom, {
        when: ({ valueOf }) => !valueOf(schemaPath.accommodation),
      });
      required(schemaPath.accommodationFrom, {
        when: ({ valueOf }) => valueOf(schemaPath.accommodation),
      });
      disabled(schemaPath.accommodationTo, {
        when: ({ valueOf }) => !valueOf(schemaPath.accommodation),
      });
      required(schemaPath.accommodationTo, {
        when: ({ valueOf }) => valueOf(schemaPath.accommodation),
      });

      maxLength(schemaPath.motivationText, 500, {
        message: 'Motivation text character limit of 500.',
      });
      pattern(schemaPath.motivationText, ApplicationPatterns.motivationText, {
        message: 'Invalid characters used.',
      });

      disabled(schemaPath.priorStudyDuration, {
        when: ({ valueOf }) => !valueOf(schemaPath.priorStudyAbroad),
      });
      required(schemaPath.priorStudyDuration, {
        when: ({ valueOf }) => valueOf(schemaPath.priorStudyAbroad),
      });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;

          const data = detail().value() as ApplicationData;

          console.log(data);

          this.applicationAPI.CreateApplication(data).subscribe((x) => console.log(x));
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
