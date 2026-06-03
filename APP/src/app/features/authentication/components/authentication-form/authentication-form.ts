import { Component, input, signal } from '@angular/core';
import {
  email,
  form,
  required,
  FormRoot,
  FormField,
  minLength,
  maxLength,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authentication-form',
  imports: [FormRoot, FormField, RouterLink],
  templateUrl: './authentication-form.html',
  styleUrl: './authentication-form.css',
})
export class AuthenticationForm {
  isLogin = input.required<boolean>();

  formModel = signal({
    email: '',
    password: '',
  });

  authForm = form(
    this.formModel,
    (schemaPath) => {
      (required(schemaPath.email, { message: 'Email is required.' }),
        email(schemaPath.email, { message: 'Invalid email address.' }),
        required(schemaPath.password, { message: 'Password is required.' }),
        minLength(schemaPath.password, 10),
        maxLength(schemaPath.password, 30));
    },
    {
      submission: {
        action: async (field) => {
          if (this.authForm().invalid()) return;

          //Send req
        },
      },
    },
  );
}
