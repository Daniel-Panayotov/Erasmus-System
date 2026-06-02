import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-application-form',
  imports: [FormRoot, FormField, RouterLink],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css',
})
export class ApplicationForm {
  formModel = signal({
    firstname: '',
    lastname: '',
  });

  applicationForm = form(this.formModel, (schemaPath) => {}, {
    submission: { action: async (detail) => {} },
  });

  populateForm() {}
}
