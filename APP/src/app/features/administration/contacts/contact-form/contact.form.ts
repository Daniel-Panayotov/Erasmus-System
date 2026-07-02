import { Component, effect, input, OnInit, output, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  pattern,
  required,
  TreeValidationResult,
} from '@angular/forms/signals';
import { ContactData, ContactFormModel } from '../../models/contact.model';
import { Patterns } from '../../../../shared/utils/patterns';

@Component({
  selector: 'app-contact-form',
  imports: [FormRoot, FormField],
  templateUrl: './contact.form.html',
  styleUrl: './contact.form.css',
})
export class ContactForm implements OnInit {
  contact = input.required<ContactData | null>();
  serverErrors = input<TreeValidationResult | null>();
  save = output<ContactData>();
  valueChange = output<ContactFormModel>();
  touched = output<boolean>();

  formModel = signal<ContactFormModel>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  contactForm = form(
    this.formModel,
    (schemaPath) => {
      required(schemaPath.firstName, { message: 'First name is required.' });
      minLength(schemaPath.firstName, 3, {
        message: 'First name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.firstName, 20, {
        message: 'First name has a maximum length of 20 characters.',
      });
      pattern(schemaPath.firstName, Patterns.textShort, {
        message: 'First name should only contain normal characters.',
      });

      required(schemaPath.lastName, { message: 'Last name is required.' });
      minLength(schemaPath.lastName, 3, {
        message: 'Last name has a minimum length of 3 characters.',
      });
      maxLength(schemaPath.lastName, 20, {
        message: 'Last name has a maximum length of 20 characters.',
      });
      pattern(schemaPath.lastName, Patterns.textShort, {
        message: 'Last name should only contain normal characters.',
      });

      required(schemaPath.phone, { message: 'Phone is required.' });
      pattern(schemaPath.phone, Patterns.phoneNumber, { message: 'Invalid phone number.' });

      required(schemaPath.email, { message: 'Email is required.' });
      email(schemaPath.email, { message: 'Invalid email.' });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;

          const formData = detail().value() as ContactData;

          this.save.emit(formData);
        },
      },
    },
  );

  constructor() {
    effect(() => {
      this.valueChange.emit(this.contactForm().value());
    });
    effect(() => {
      this.touched.emit(this.contactForm().touched());
    });
  }

  ngOnInit() {
    if (!this.contact()) return;

    const contactData: ContactFormModel = {
      ...(this.contact() as ContactData),
    };

    this.contactForm().controlValue.set(contactData);
  }

  onPhoneInput(event: InputEvent) {
    const target: any = event.target;

    // removes white spaces from the input value
    const cleaned = target.value.replace(/\s+/g, '');

    // updates the input and form field with the cleaned value
    target.value = cleaned;

    this.contactForm.phone().controlValue.set(cleaned);
  }
}
