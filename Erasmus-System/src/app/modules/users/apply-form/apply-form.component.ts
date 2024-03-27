import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { NavigationComponent } from 'src/app/core/navigation/navigation.component';
import { ApiService } from 'src/app/services/general-services/api.service';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';
import {
  environment,
  listDocProperties,
} from 'src/app/shared/environments/environment';
import {
  contactsRegex,
  globalRegex,
  userDataRegex,
} from 'src/app/shared/environments/validationEnvironment';
import { Faculty, Field } from 'src/app/types/adminDocs';

@Component({
  selector: 'app-apply-form',
  standalone: true,
  imports: [
    NavigationComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
    DropdownComponent,
  ],
  templateUrl: './apply-form.component.html',
  styleUrl: './apply-form.component.css',
})
export class ApplyFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private cookieService = inject(CookieService);

  fields: Field[] = [];

  async ngOnInit(): Promise<void> {
    await this.getFaculties();
  }

  applyForm = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.pattern(contactsRegex.personName)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.pattern(contactsRegex.personName)],
    ],
    birthDate: [
      '',
      [Validators.required, Validators.pattern(globalRegex.date)],
    ],
    sex: ['', [Validators.required, Validators.pattern(globalRegex.gender)]],
    birthPlace: [
      '',
      [Validators.required, Validators.pattern(globalRegex.country)],
    ],
    nationality: [
      '',
      [Validators.required, Validators.pattern(globalRegex.country)],
    ],
    // add regex
    address: ['', [Validators.required]],
    phone: [
      '',
      [Validators.required, Validators.pattern(globalRegex.phoneNumber)],
    ],
    academicYearFrom: [
      '',
      [Validators.required, Validators.pattern(globalRegex.year)],
    ],
    academicYearTo: [
      '',
      [Validators.required, Validators.pattern(globalRegex.year)],
    ],
    mobilityType: [
      '',
      [Validators.required, Validators.pattern(userDataRegex.mobilityType)],
    ],
    semesterSeason: [
      '',
      [Validators.required, Validators.pattern(userDataRegex.semesterSeason)],
    ],
  });

  async onSubmit(): Promise<void> {
    console.log(this.applyForm);
  }

  async getFaculties() {
    const cookie = this.cookieService.get(environment.authCookieName);
    try {
      const res = await this.apiService.getAll(cookie, 'fields');
      this.fields = await res.json();
    } catch (err) {}
  }

  get fieldProperties() {
    return Object.entries(listDocProperties['fields'])[1];
  }
}
