import { Component, computed, inject } from '@angular/core';
import { administration } from '../administration.paths';
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
    { label: 'Contacts', url: administration.contacts.view.segments },
    ...(this.currentUrl()?.includes('create')
      ? [{ label: 'Create contact', url: administration.contacts.create.segments }]
      : []),
  ]);
}
