import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';
import { EventType, Router } from '@angular/router';
import { filter, map } from 'rxjs';

export interface Tab {
  label: string;
  url: string[];
  disabled?: boolean;
}

@Component({
  selector: 'app-tab-group',
  imports: [MatTabsModule],
  templateUrl: './tab-group.html',
  styleUrl: './tab-group.css',
})
export class TabGroup {
  private router = inject(Router);

  tabs = input<Tab[]>([]);

  urls = computed(() => this.tabs().map((t) => t.url));

  tabIndex = toSignal(
    this.router.events.pipe(
      filter((v) => v.type == EventType.NavigationEnd),
      map((v: any) => {
        const url: string = v.urlAfterRedirects;
        const urls = this.urls();

        const value = urls.find((v) => url == v.join('/'));

        if (!value) return urls.length;

        return urls.findIndex((v) => v == value);
      }),
    ),
  );

  navigate(index: number) {
    if (index > this.urls().length - 1) return;
    this.router.navigate(this.urls()[index]);
  }
}
