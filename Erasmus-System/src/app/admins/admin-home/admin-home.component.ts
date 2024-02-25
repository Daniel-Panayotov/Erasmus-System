import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  isNavShown: boolean = true;

  toggleNav(): void {
    this.isNavShown = !this.isNavShown;
  }
}
