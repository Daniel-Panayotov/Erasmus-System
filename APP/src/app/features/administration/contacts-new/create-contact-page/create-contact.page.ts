import { Component, computed, inject, signal } from '@angular/core';
import { ContactForm } from '../../shared/contact-form/contact.form';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { ContactData, ContactFormModel, NewContact } from '../../models/contact.model';
import { administrationPaths } from '../../administration.paths';
import { ContactDraftStore } from '../contact-draft.store';

@Component({
  selector: 'app-create-contact-page',
  imports: [ContactForm],
  templateUrl: './create-contact.page.html',
})
export class CreateContactPage {
  private contactAPI = inject(ContactService);
  private draftStore = inject(ContactDraftStore);
  private router = inject(Router);

  serverErrors = signal<TreeValidationResult | null>(null);

  contact = computed(() => this.draftStore.contact());

  valueChange(data: ContactFormModel) {
    this.draftStore.contact.set(data);
  }

  createContact(data: ContactData) {
    const institutionID = this.draftStore.institution()?.institutionID ?? null;

    const body: NewContact = { ...data, institutionID };

    this.contactAPI.Create(body).subscribe({
      next: (v) => this.router.navigate(administrationPaths.contacts.view),
      error(err) {},
    });
  }
}
