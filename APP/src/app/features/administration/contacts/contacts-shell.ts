import { Component, computed, inject } from '@angular/core';
import { administrationPaths } from '../administration.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';
import { ContactStore } from './contact.store';
import { EventType, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contacts-shell',
  imports: [PageShell],
  providers: [ContactStore],
  template: '<app-page-shell [tabs]="tabs()" />',
})
export class ContactsShell {
  private draftStore = inject(ContactStore);
  private router = inject(Router);

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e.type == EventType.NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  tabs = computed(() =>
    this.currentUrl()?.includes('create')
      ? [
          { label: 'Create contact', url: administrationPaths.contacts.create },
          { label: 'Add institutions', url: administrationPaths.contacts.create_institutions },
        ]
      : [
          { label: 'Contacts', url: administrationPaths.contacts.view },
          {
            label: 'Institutions',
            disabled: this.draftStore.selectedContactID() == null ? true : false,
            url: administrationPaths.contacts.update_institutions(
              this.draftStore.selectedContactID()?.toString() ?? '',
            ),
          },
        ],
  );
}
