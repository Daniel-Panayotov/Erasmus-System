import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from 'src/app/services/general-services/auth.service';
import {
  adminRoutes,
  home,
  userRoutes,
} from 'src/app/shared/environments/siteRoutingEnvironment';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  //inject dependencies
  authService = inject(AuthService);
  cookieService = inject(CookieService);
  location = inject(Location);
  router = inject(Router);

  isOnAdminPage: boolean = false;
  //variables
  userRoutes = userRoutes;
  adminRoutes = adminRoutes;
  homeRoute: string = home;
  //
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor() {
    this.location.onUrlChange((url) => {
      this.isOnAdminPage = url.includes('admins') ? true : false;
    });

    this.authService.authCookieSubject$.pipe(takeUntilDestroyed()).subscribe({
      next: async (jwt) => {
        if (!jwt) {
          this.isAuthenticated = false;
          this.isAdmin = false;
          return;
        }

        try {
          const res = await this.authService.verifyCookie(jwt);
          const data = await res.json();

          const { isAdmin, isAuthenticated } = data;
          this.isAuthenticated = isAuthenticated;
          this.isAdmin = isAdmin;
        } catch (err) {}
      },
      error(err) {
        console.log(err);
      },
    });
  }

  logout(): void {
    //clear state
    this.authService.deleteJwtCookie();
    this.router.navigate(['/home']);
  }
}
