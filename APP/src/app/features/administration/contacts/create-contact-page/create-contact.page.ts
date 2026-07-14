import { Component, inject, signal } from '@angular/core';
import { ContactForm } from '../contact-form/contact.form';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { ContactDataDTO } from '../../models/contact.model';
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
  draftTouched = this.contactsStore.drafts.touched;

  changeTouched(touched: boolean) {
    if (this.draftTouched()) return;
    this.draftTouched.set(touched);
  }

  valueChange(data: ContactDataDTO) {
    if (!this.draftTouched()) return;
    this.contactsStore.drafts.contactModel.set(data);
  }

  createContact(data: ContactDataDTO) {
    this.contactAPI.Create(data).subscribe({
      next: (v) => {
        this.contactsStore.resetDrafts();
        this.router.navigate(administration.contacts.view.segments);
      },
      error(err) {},
    });
  }
}
