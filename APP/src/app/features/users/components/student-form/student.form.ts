import { Component, inject, signal } from '@angular/core';
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
import { StudentBase, StudentData, StudentFormModel } from '../../models/student.form.models';
import { Patterns } from '../../../../shared/utils/patterns';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAPI } from '../../services/student.api.service';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-form',
  imports: [FormRoot, FormField],
  templateUrl: './student.form.html',
  styleUrl: './student.form.css',
})
export class StudentForm {
  private studentApi = inject(StudentAPI);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  userID = this.route.snapshot.params['userID'];
  isUpdate = this.route.snapshot.url[0].path == 'update';

  student = signal<StudentBase | null>(null);

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

          let result: TreeValidationResult | null = null;

          if (this.isUpdate)
            this.studentApi.UpdateStudent(this.student()!.studentID, formData).subscribe({
              error(err: HttpErrorResponse) {
                result = { kind: 'serverError', message: err.error };
              },
            });
          else
            this.studentApi.CreateStudent(1, formData).subscribe({
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

  ngOnInit() {
    if (!this.isUpdate) return;

    this.studentApi
      .GetStudent(this.userID)
      .pipe(
        catchError((err) => {
          this.router.navigateByUrl('');
          return EMPTY;
        }),
      )
      .subscribe((s) => {
        const student = s.body as StudentBase;

        this.student.set(student);

        const studentdata: StudentFormModel = { ...student };

        this.studentForm().controlValue.set(studentdata);
      });
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
