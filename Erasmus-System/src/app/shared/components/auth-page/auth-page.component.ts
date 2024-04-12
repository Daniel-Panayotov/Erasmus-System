import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { globalRegex } from '../../environments/validationEnvironment';
import { environment } from '../../environments/environment';
import { AuthService } from 'src/app/services/general-services/auth.service';
import {
  getRouteAfterAuth,
  userRoutes,
} from '../../environments/siteRoutingEnvironment';
import { NavigationComponent } from 'src/app/core/navigation/navigation.component';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import {
  authActionString,
  authSectionString,
} from 'src/app/types/apiEnvironmentTypes';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NavigationComponent,
    FooterComponent,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  @Input({ required: true }) authModule = '' as authSectionString;
  @Input({ required: true }) authAction = '' as authActionString;
  @Input({ required: true }) sectionName: string = '';

  userRoutes = userRoutes;

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
      this.authService.setJwtCookie(jwt);

      /* Navigate to predetermined route
       */
      const route = getRouteAfterAuth(this.authModule);
      this.router.navigate([route]);
    } catch (err: any) {
      /* Display error
       */
      const { message } = await err.json();
      this.error = message;
    }
  }

  /* Toggle password input type: password/text
   */
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
