import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  imports: [],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css',
})
export class ApplicationForm {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: [''],
  });
}
