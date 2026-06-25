import { Component, computed, inject } from '@angular/core';
import { EventType, Router, RouterOutlet } from '@angular/router';
import { ContactDraftStore } from '../contact-draft.store';
import { MatTabsModule } from '@angular/material/tabs';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { administrationPaths } from '../../administration.paths';

@Component({
  selector: 'app-contacts-new-shell',
  imports: [RouterOutlet, MatTabsModule],
  templateUrl: './contacts-new-shell.html',
  styleUrl: './contacts-new-shell.css',
  providers: [ContactDraftStore],
})
export class ContactsNewShell {
  private router = inject(Router);

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

  urls = computed(() => [
    administrationPaths.contacts_new.create,
    administrationPaths.contacts_new.institutions,
  ]);

  navigate(index: number) {
    if (index > this.urls().length - 1) return;
    this.router.navigate(this.urls()[index]);
  }
}
