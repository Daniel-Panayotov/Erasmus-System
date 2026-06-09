import { Component, inject, input, signal } from '@angular/core';
import {
  email,
  form,
  required,
  FormRoot,
  FormField,
  minLength,
  maxLength,
  TreeValidationResult,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { UserData } from '../../models/userModel';
import { AuthenticationService } from '../../services/authentication-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authentication-form',
  imports: [FormRoot, FormField, RouterLink],
  templateUrl: './authentication-form.html',
  styleUrl: './authentication-form.css',
})
export class AuthenticationForm {
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  isLogin = input.required<boolean>();

  formModel = signal<UserData>({
    Email: '',
    Password: '',
  });

  // TODO: Add form input field identification for server error.
  // If a users password is wrong, then the field state must be manually set
  authForm = form(
    this.formModel,
    (schemaPath) => {
      (required(schemaPath.Email, { message: 'Email is required.' }),
        email(schemaPath.Email, { message: 'Invalid email address.' }),
        required(schemaPath.Password, { message: 'Password is required.' }),
        minLength(schemaPath.Password, 10, { message: 'Minimum length is 10 characters.' }),
        maxLength(schemaPath.Password, 255, { message: 'Maxium length is 255 characters.' }));
    },
    {
      submission: {
        action: async (detail) => {
          if (this.authForm().invalid()) return;

          const formData = detail().value();
          let result: TreeValidationResult | null = null;

          if (this.isLogin())
            this.authService.login(formData).subscribe({
              error(err: HttpErrorResponse) {
                result = { kind: 'serverError', message: err.error };
              },
            });
          else
            this.authService.register(formData).subscribe({
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
}
