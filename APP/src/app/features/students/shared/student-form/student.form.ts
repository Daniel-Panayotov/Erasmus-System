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
import { StudentData, StudentFormModel } from '../../models/student.model';
import { Patterns } from '../../../../shared/utils/patterns';

@Component({
  selector: 'app-student-form',
  imports: [FormRoot, FormField],
  templateUrl: './student.form.html',
  styleUrl: './student.form.css',
})
export class StudentForm implements OnInit {
  student = input.required<StudentFormModel | null>();
  serverErrors = input<TreeValidationResult | null>();
  save = output<StudentData>();
  valueChange = output<StudentFormModel>();
  touched = output<boolean>();

  formModel = signal<StudentFormModel>({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: null,
    nationality: '',
    address: '',
    phoneNumber: '',
  });

  // TODO: Add form input field identification for server error.
  // If a users password is wrong, then the field state must be manually set
  studentForm = form(
    this.formModel,
    (schemaPath) => {
      required(schemaPath.firstName, { message: 'First name is required.' });
      minLength(schemaPath.firstName, 3, {
        message: 'First name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.firstName, 20, {
        message: 'First name has a maximum length of 20 characters.',
      });
      pattern(schemaPath.firstName, Patterns.textShort, {
        message: 'First name should only contain normal characters.',
      });

      required(schemaPath.lastName, { message: 'Last name is required.' });
      minLength(schemaPath.lastName, 3, {
        message: 'Last name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.lastName, 20, {
        message: 'Last name has a maximum length of 20 characters.',
      });
      pattern(schemaPath.lastName, Patterns.textShort, {
        message: 'Last name should only contain normal characters.',
      });

      required(schemaPath.birthDate, { message: 'Birthday is required.' });

      required(schemaPath.gender, { message: 'Gender is required.' });
      pattern(schemaPath.gender, Patterns.gender, { message: 'Invalid gender.' });

      required(schemaPath.nationality, { message: 'Nationality is required.' });
      pattern(schemaPath.nationality, Patterns.textShort, {
        message: 'Nationality should only contain normal characters.',
      });

      required(schemaPath.address, { message: 'Address is required.' });
      pattern(schemaPath.address, Patterns.address, {
        message: 'Current Address is invalid.',
      });

      required(schemaPath.phoneNumber, { message: 'Phone number is required.' });
      pattern(schemaPath.phoneNumber, Patterns.phoneNumber, { message: 'Invalid phone number.' });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;

          const formData = detail().value() as StudentData;

          this.save.emit(formData);
        },
      },
    },
  );

  constructor() {
    effect(() => {
      this.valueChange.emit(this.studentForm().controlValue());
    });
    effect(() => {
      this.touched.emit(this.studentForm().touched());
    });
  }

  ngOnInit() {
    if (!this.student()) return;

    const studentdata: StudentFormModel = { ...(this.student() as StudentData) };

    this.studentForm().controlValue.set(studentdata);
  }

  onPhoneInput(event: InputEvent) {
    const target: any = event.target;

    // removes white spaces from the input value
    const cleaned = target.value.replace(/\s+/g, '');

    // updates the input and form field with the cleaned value
    target.value = cleaned;

    this.studentForm.phoneNumber().controlValue.set(cleaned);
  }
}
