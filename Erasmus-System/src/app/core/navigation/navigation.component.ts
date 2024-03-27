import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/general-services/auth.service';
import { environment } from 'src/app/shared/environments/environment';
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
export class NavigationComponent implements OnInit {
  //inject dependencies
  authService = inject(AuthService);
  cookieService = inject(CookieService);

  //variables
  userRoutes = userRoutes;
  adminMenuRoute = adminRoutes.adminMenu;
  homeRoute: string = home;
  //
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  async ngOnInit(): Promise<void> {
    await this.checkCookie();
  }

  async checkCookie(): Promise<void> {
    const cookie = this.cookieService.get(environment.authCookieName);

    try {
      const res = await this.authService.verifyCookie(cookie);
      const data = await res.json();

      const { isAdmin, isAuthenticated } = data;
      this.isAuthenticated = isAuthenticated;
      this.isAdmin = isAdmin;
    } catch (err) {}
  }

  logout(): void {
    //clear state
    this.cookieService.delete(environment.authCookieName, '/');
    this.isAuthenticated = false;
    this.isAdmin = false;
  }
}
