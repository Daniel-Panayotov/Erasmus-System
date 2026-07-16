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
import { UniversityDataDTO } from '../../models/university.model';
import { Patterns } from '../../../../shared/utils/patterns';

@Component({
  selector: 'app-university-form',
  imports: [FormRoot, FormField],
  templateUrl: './university-form.html',
  styleUrl: './university-form.css',
})
export class UniversityForm implements OnInit {
  university = input.required<UniversityDataDTO | null>();
  serverErrors = input<TreeValidationResult | null>();
  save = output<UniversityDataDTO>();
  valueChange = output<UniversityDataDTO>();
  touched = output<boolean>();

  formModel = signal<UniversityDataDTO>({
    code: '',
    name: '',
    address: '',
  });

  universityForm = form(
    this.formModel,
    (schemaPath) => {
      required(schemaPath.code, { message: 'Code is required.' });

      required(schemaPath.name, { message: 'University name is required.' });
      minLength(schemaPath.name, 3, {
        message: 'University name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.name, 50, {
        message: 'University name has a maximum length of 50 characters.',
      });
      pattern(schemaPath.name, Patterns.textShort, {
        message: 'University name should only contain normal characters.',
      });

      required(schemaPath.address, { message: 'University address is required.' });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;

          const formData = detail().value();

          this.save.emit(formData);
        },
      },
    },
  );

  constructor() {
    effect(() => {
      this.valueChange.emit(this.universityForm().value());
    });
    effect(() => {
      this.touched.emit(this.universityForm().touched() || this.universityForm().dirty());
    });
  }

  ngOnInit() {
    if (!this.university()) return;

    this.universityForm().controlValue.set(this.university()!);
  }
}
