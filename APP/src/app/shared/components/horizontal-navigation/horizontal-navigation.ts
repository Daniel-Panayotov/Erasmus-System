import { Component, inject, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NavIcon } from '../../models/horizontal-navigation.model';
import { EventType, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-horizontal-navigation',
  imports: [NgIcon, RouterLink],
  templateUrl: './horizontal-navigation.html',
  styleUrl: './horizontal-navigation.css',
})
export class HorizontalNavigation {
  private router = inject(Router);

  icons = input.required<NavIcon[]>();
  shownChange = output<boolean>();

  constructor() {
    this.router.events
      .pipe(
        filter((e) => e.type == EventType.NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => {
        this.shownChange.emit(false);
      });
  }
}
