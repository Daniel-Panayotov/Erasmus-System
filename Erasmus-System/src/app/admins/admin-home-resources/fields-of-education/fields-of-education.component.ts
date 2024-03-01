import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FieldsOfEducationService } from 'src/app/services/fields-of-education.service';
import { environment } from 'src/app/shared/environments/environment';
import { Fields } from 'src/app/types/fields';

@Component({
  selector: 'app-fields-of-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fields-of-education.component.html',
  styleUrl: './fields-of-education.component.css',
})
export class FieldsOfEducationComponent implements OnInit {
  fields: [Fields] = [] as unknown as [Fields]; //variable to hold the fields data
  isPopupVisible: boolean = false;
  errorAddingField: boolean = false;

  constructor(
    private fieldsService: FieldsOfEducationService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {}

  //get all fields and add them to the global variable
  async ngOnInit(): Promise<void> {
    const authCookie = this.cookieService.get(environment.authCookieName);
    try {
      const response = await this.fieldsService.getAllFields(authCookie);
      const data = await response.json();
      this.fields = data;
    } catch (err) {}
  }

  async onDelete(id: string, index: number): Promise<void> {
    const isSure = window.confirm('Would you like to delete this field?');

    if (!isSure) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      await this.fieldsService.deleteOneField(authCookie, id);
      //ensure field is deleted from the array
      this.fields.splice(index, 1);
    } catch (err) {}
  }

  //popup form stuff

  createFieldForm = this.fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    ],
    name: ['', [Validators.required, Validators.minLength(5)]],
  });

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  async addField(): Promise<void> {
    const { code, name } = this.createFieldForm.value;

    if (!code || !name) {
      return;
    }

    if (code.length != 3 || name.length < 5) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      const response = await this.fieldsService.addOneField(authCookie, {
        code,
        name,
      });
      const data = await response.json();
      this.fields.push(data);
      this.isPopupVisible = false;
    } catch (err) {
      this.errorAddingField = true;
    }
  }
}
