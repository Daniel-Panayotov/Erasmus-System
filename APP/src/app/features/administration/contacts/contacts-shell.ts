import { Component, computed, inject } from '@angular/core';
import { administrationPaths } from '../administration.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';
import { ContactsStore } from './contact.store';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs';
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
  private route = inject(ActivatedRoute);

  selectedContactID = this.contactsStore.selectedContactID;

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e.type == EventType.NavigationEnd),
      tap(() => {
        const contactID = this.route.firstChild?.snapshot.params['contactID'] ?? null;
        this.selectedContactID.set(contactID);
      }),
      map((e) => e.url),
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
            disabled: this.selectedContactID() == null ? true : false,
            url: administrationPaths.contacts.update_institutions(
              this.selectedContactID()?.toString() ?? '',
            ),
          },
        ]),
  ]);
}
