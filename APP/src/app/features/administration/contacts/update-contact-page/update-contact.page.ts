import { Component, effect, inject, input, signal } from '@angular/core';
import { ContactForm } from '../contact-form/contact.form';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Contact, ContactData } from '../../models/contact.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-contact-page',
  imports: [ContactForm],
  templateUrl: './update-contact.page.html',
})
export class UpdateContactPage {
  private contactAPI = inject(ContactService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  contactID = input.required<number>();

  serverErrors = signal<TreeValidationResult | null>(null);

  contactResource = rxResource({
    params: () => ({ contactID: this.contactID() }),
    stream: ({ params }) =>
      this.contactAPI.GetOne(params.contactID).pipe(map((v) => v.body as Contact)),
  });
  contactSignal = signal<ContactData | null>(null);

  updateContact(data: ContactData) {
    const contact = this.contactResource.value()!;

    this.contactAPI
      .Update(this.contactID(), {
        ...data,
        institutionID: contact.institution?.institutionID ?? null,
      })
      .subscribe({
        next: () => this.router.navigate(['../..'], { relativeTo: this.route }),
        error(err: HttpErrorResponse) {
          console.log(err);
        },
      });
  }

  constructor() {
    effect(() => {
      this.contactResource.hasValue()
        ? this.contactSignal.set({ ...(this.contactResource.value() as ContactData) })
        : this.contactSignal.set(null);
    });
  }
}
