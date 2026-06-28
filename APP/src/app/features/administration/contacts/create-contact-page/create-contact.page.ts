import { Component, computed, inject, signal } from '@angular/core';
import { ContactForm } from '../contact-form/contact.form';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { ContactData, ContactFormModel, SaveContact } from '../../models/contact.model';
import { administrationPaths } from '../../administration.paths';
import { ContactStore } from '../contact.store';

@Component({
  selector: 'app-create-contact-page',
  imports: [ContactForm],
  templateUrl: './create-contact.page.html',
})
export class CreateContactPage {
  private contactAPI = inject(ContactService);
  private draftStore = inject(ContactStore);
  private router = inject(Router);

  serverErrors = signal<TreeValidationResult | null>(null);

  contact = computed(() => this.draftStore.contact());

  valueChange(data: ContactFormModel) {
    this.draftStore.contact.set(data);
  }

  createContact(data: ContactData) {
    const institutionID = this.draftStore.institution()?.institutionID;

    if (institutionID == null) return; //TODO error modal

    const body: SaveContact = { ...data, institutionID };

    this.contactAPI.Create(body).subscribe({
      next: (v) => {
        this.draftStore.resetDrafts();
        this.router.navigate(administrationPaths.contacts.view);
      },
      error(err) {},
    });
  }
}
