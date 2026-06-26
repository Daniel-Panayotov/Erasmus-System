import { Component, effect, input, OnInit, output, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  pattern,
  required,
  TreeValidationResult,
} from '@angular/forms/signals';
import { InstitutionData, InstitutionFormModel } from '../../models/institution.model';
import { Patterns } from '../../../../shared/utils/patterns';

@Component({
  selector: 'app-institution-form',
  imports: [FormRoot, FormField],
  templateUrl: './institution.form.html',
  styleUrl: './institution.form.css',
})
export class InstitutionForm implements OnInit {
  institution = input.required<InstitutionData | null>();
  serverErrors = input<TreeValidationResult | null>();
  save = output<InstitutionData>();
  valueChange = output<InstitutionFormModel>();

  formModel = signal<InstitutionFormModel>({
    code: '',
    name: '',
    address: '',
  });

  institutionForm = form(
    this.formModel,
    (schemaPath) => {
      required(schemaPath.code, { message: 'Code is required.' });

      required(schemaPath.name, { message: 'Institution name is required.' });
      minLength(schemaPath.name, 3, {
        message: 'Institution name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.name, 50, {
        message: 'Institution name has a maximum length of 50 characters.',
      });
      pattern(schemaPath.name, Patterns.textShort, {
        message: 'Institution name should only contain normal characters.',
      });

      required(schemaPath.address, { message: 'Address is required.' });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;

          const formData = detail().value() as InstitutionData;

          this.save.emit(formData);
        },
      },
    },
  );

  constructor() {
    effect(() => {
      this.valueChange.emit(this.institutionForm().value());
    });
  }

  ngOnInit() {
    if (!this.institution()) return;

    const institutionData: InstitutionFormModel = {
      ...(this.institution() as InstitutionData),
    };

    this.institutionForm().controlValue.set(institutionData);
  }
}
