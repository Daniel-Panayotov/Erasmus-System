import { Component, computed, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactsStore } from './contact.store';
import { CanDeactivateFormInterface } from '../../../core/guards/form.guard';

@Component({
  selector: 'app-contacts-create-shell',
  imports: [RouterOutlet],
  template: '<router-outlet/>',
})
export class ContactsCreateShell implements OnDestroy, CanDeactivateFormInterface {
  private contactsStore = inject(ContactsStore);

  canDeactivate = computed(() => {
    return !this.contactsStore.drafts.contactModel();
  });

  ngOnDestroy(): void {
    this.contactsStore.resetDrafts();
  }
}
