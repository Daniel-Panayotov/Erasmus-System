import { CommonModule } from '@angular/common';
import { Component, Input, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { globalRegex } from '../../environments/validationEnvironment';
import { environment } from '../../environments/environment';
import { AuthService } from 'src/app/services/general-services/auth.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  @Input({ required: true }) authModule: string = '';
  @Input({ required: true }) authAction: string = '';
  @Input({ required: true }) sectionName: string = '';

  showPassword: boolean = false;
  error: string = '';

  //inject dependencies
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  cookieService = inject(CookieService);
  router = inject(Router);

  //create form with validators
  authenticationForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(globalRegex.emailRegex)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(30)],
    ],
  });

  async submitForm(): Promise<void> {
    const { email, password } = this.authenticationForm.value;

    //validate Input
    if (!email || !password) {
      return;
    }

    if (
      !globalRegex.emailRegex.exec(email) ||
      password.length < 10 ||
      password.length > 50
    ) {
      return;
    }

    try {
      /* Send request with validated data
       */
      const response = await this.authService.authenticate(
        this.authModule,
        this.authAction,
        {
          email,
          password,
        }
      );
      /* Get and set jwt
       */
      const { jwt } = await response.json();
      this.cookieService.set(environment.authCookieName, jwt, undefined, '/');

      /* Navigate to predetermined route
       */
      this.router.navigate(['/admins/menu']);
    } catch (err: any) {
      /* Display error
       */
      const { message } = await err.json();
      console.log(message);
      this.error = message;
    }
  }

  /* Toggle password input type: password/text
   */
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
