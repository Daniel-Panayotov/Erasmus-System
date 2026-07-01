import { Component, inject, signal } from '@angular/core';
import { ContactForm } from '../contact-form/contact.form';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { ContactData, ContactFormModel, SaveContact } from '../../models/contact.model';
import { administration } from '../../administration.paths';
import { ContactsStore } from '../contact.store';

@Component({
  selector: 'app-create-contact-page',
  imports: [ContactForm],
  templateUrl: './create-contact.page.html',
})
export class CreateContactPage {
  private contactAPI = inject(ContactService);
  private contactsStore = inject(ContactsStore);
  private router = inject(Router);

  serverErrors = signal<TreeValidationResult | null>(null);

  contact = this.contactsStore.drafts.contactModel;

  valueChange(data: ContactFormModel) {
    this.contactsStore.drafts.contactModel.set(data);
  }

  createContact(data: ContactData) {
    const institutionID = this.contactsStore.drafts.institution()?.institutionID ?? null;

    const body: SaveContact = { ...data, institutionID };

    this.contactAPI.Create(body).subscribe({
      next: (v) => {
        this.contactsStore.resetDrafts();
        this.router.navigate(administration.contacts.view.segments);
      },
      error(err) {},
    });
  }
}
