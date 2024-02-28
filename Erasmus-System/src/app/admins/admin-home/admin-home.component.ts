import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authCookieName } from 'src/app/shared/constants';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  isNavShown: boolean = true;

  constructor(private cookieService: CookieService) {}

  toggleNav(): void {
    this.isNavShown = !this.isNavShown;
  }

  logoutAdmin(): void {
    this.cookieService.delete(authCookieName);
  }
}
