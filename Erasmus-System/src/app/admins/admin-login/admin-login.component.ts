import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from 'src/app/shared/components/auth-page/auth-page.component';
import {
  authActionString,
  authModuleString,
} from 'src/app/types/apiEnvironmentTypes';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, AuthPageComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  authModule: authModuleString = 'admins';
  authAction: authActionString = 'login';
  sectionName: string = 'Admin';
}
