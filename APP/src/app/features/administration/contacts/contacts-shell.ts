import { Component, computed, inject } from '@angular/core';
import { administrationPaths } from '../administration.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';
import { ContactsStore } from './contact.store';
import { EventType, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contacts-shell',
  imports: [PageShell],
  providers: [ContactsStore],
  template: '<app-page-shell [tabs]="tabs()" />',
})
export class ContactsShell {
  private contactsStore = inject(ContactsStore);
  private router = inject(Router);

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e.type == EventType.NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  tabs = computed(() => [
    { label: 'Contacts', url: administrationPaths.contacts.view },
    ...(this.currentUrl()?.includes('create')
      ? [
          { label: 'Create contact', url: administrationPaths.contacts.create },
          { label: 'Add institution', url: administrationPaths.contacts.create_institutions },
        ]
      : [
          {
            label: 'Institutions',
            disabled: this.contactsStore.selectedContactID() == null ? true : false,
            url: administrationPaths.contacts.update_institutions(
              this.contactsStore.selectedContactID()?.toString() ?? '',
            ),
          },
        ]),
  ]);
}
