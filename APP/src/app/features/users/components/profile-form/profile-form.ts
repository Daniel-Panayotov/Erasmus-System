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
import { ProfileFormModel } from '../../models/profile-form.models';
import { Patterns } from '../../../../shared/utils/patterns';
import { HttpClient } from '@angular/common/http';
import { PROFILE_FORM_STATE } from '../../profile-form.state.token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  imports: [FormRoot, FormField],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
})
export class ProfileForm {
  private http = inject(HttpClient);
  private router = inject(Router);
  private formState = inject(PROFILE_FORM_STATE);

  ngOnInit() {}

  formModel = signal<ProfileFormModel>({
    firstname: '',
    lastname: '',
    birthday: null,
    gender: '',
    nationality: '',
    address: '',
    phone: '',
  });

  profileForm = form(
    this.formModel,
    (schemaPath) => {
      required(schemaPath.firstname, { message: 'First name is required.' });
      minLength(schemaPath.firstname, 3, {
        message: 'First name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.firstname, 20, {
        message: 'First name has a maximum length of 20 characters.',
      });
      pattern(schemaPath.firstname, Patterns.textShort, {
        message: 'First name should only contain normal characters.',
      });

      required(schemaPath.lastname, { message: 'Last name is required.' });
      minLength(schemaPath.lastname, 3, {
        message: 'Last name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.lastname, 20, {
        message: 'Last name has a maximum length of 20 characters.',
      });
      pattern(schemaPath.lastname, Patterns.textShort, {
        message: 'Last name should only contain normal characters.',
      });

      required(schemaPath.birthday, { message: 'Birthday is required.' });

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

      required(schemaPath.phone, { message: 'Phone number is required.' });
      pattern(schemaPath.phone, Patterns.phoneNumber, { message: 'Invalid phone number.' });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;
        },
      },
    },
  );
}
