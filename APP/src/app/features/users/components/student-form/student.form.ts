import { Component, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  pattern,
  required,
} from '@angular/forms/signals';
import { StudentFormModel } from '../../models/student.form.models';
import { Patterns } from '../../../../shared/utils/patterns';
import { HttpClient } from '@angular/common/http';
import { STUDENT_FORM_STATE } from '../../student.form.state.token';
import { Router } from '@angular/router';
import { StudentApiService } from '../../services/student.api.service';

@Component({
  selector: 'app-student-form',
  imports: [FormRoot, FormField],
  templateUrl: './student.form.html',
  styleUrl: './student.form.css',
})
export class StudentForm {
  private studentApi = inject(StudentApiService);
  private formState = inject(STUDENT_FORM_STATE);
  private router = inject(Router);

  formModel = signal<StudentFormModel>({
    FirstName: '',
    LastName: '',
    BirthDate: null,
    Gender: '',
    Nationality: '',
    Address: '',
    PhoneNumber: '',
  });

  studentForm = form(
    this.formModel,
    (schemaPath) => {
      required(schemaPath.FirstName, { message: 'First name is required.' });
      minLength(schemaPath.FirstName, 3, {
        message: 'First name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.FirstName, 20, {
        message: 'First name has a maximum length of 20 characters.',
      });
      pattern(schemaPath.FirstName, Patterns.textShort, {
        message: 'First name should only contain normal characters.',
      });

      required(schemaPath.LastName, { message: 'Last name is required.' });
      minLength(schemaPath.LastName, 3, {
        message: 'Last name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.LastName, 20, {
        message: 'Last name has a maximum length of 20 characters.',
      });
      pattern(schemaPath.LastName, Patterns.textShort, {
        message: 'Last name should only contain normal characters.',
      });

      required(schemaPath.BirthDate, { message: 'Birthday is required.' });

      required(schemaPath.Gender, { message: 'Gender is required.' });
      pattern(schemaPath.Gender, Patterns.gender, { message: 'Invalid gender.' });

      required(schemaPath.Nationality, { message: 'Nationality is required.' });
      pattern(schemaPath.Nationality, Patterns.textShort, {
        message: 'Nationality should only contain normal characters.',
      });

      required(schemaPath.Address, { message: 'Address is required.' });
      pattern(schemaPath.Address, Patterns.address, {
        message: 'Current Address is invalid.',
      });

      required(schemaPath.PhoneNumber, { message: 'Phone number is required.' });
      pattern(schemaPath.PhoneNumber, Patterns.phoneNumber, { message: 'Invalid phone number.' });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;
        },
      },
    },
  );

  ngOnInit() {
    if (!this.formState.isUpdate) return;

    this.studentApi.GetStudent(1).subscribe((s) => console.log(s));
  }
}
