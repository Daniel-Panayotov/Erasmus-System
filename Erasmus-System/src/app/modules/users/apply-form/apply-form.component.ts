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
  facultiesRegex,
  fieldsRegex,
  globalRegex,
  userDataRegex,
} from 'src/app/shared/environments/validationEnvironment';
import { adminRecords } from 'src/app/types/adminDocs';

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

  records = {} as adminRecords;

  async ngOnInit(): Promise<void> {
    await this.fetchRecords();
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
    fieldOfStudyRef: [
      '',
      [Validators.required, Validators.pattern(fieldsRegex.fieldName)],
    ],
    //
    sendingContactRef: ['', [Validators.pattern(contactsRegex.personName)]],
    sendingFaculty: [
      '',
      [Validators.required, Validators.pattern(facultiesRegex.facultyName)],
    ],
    receivingFacultyRef: [
      '',
      [Validators.required, Validators.pattern(facultiesRegex.facultyName)],
    ],
    receivingContactRef: ['', [Validators.pattern(facultiesRegex.facultyName)]],
    studyFrom: [
      '',
      [Validators.required, Validators.pattern(globalRegex.date)],
    ],
    studyTo: ['', [Validators.required, Validators.pattern(globalRegex.date)]],
    accommodation: [
      '',
      [Validators.required, Validators.pattern(globalRegex.yes_no)],
    ],
    stayFrom: ['', [Validators.required, Validators.pattern(globalRegex.date)]],
    stayTo: ['', [Validators.required, Validators.pattern(globalRegex.date)]],
    bulgarianCourse: [
      '',
      [Validators.required, Validators.pattern(globalRegex.yes_no)],
    ],
  });

  async onSubmit(): Promise<void> {
    console.log(this.applyForm.value);
  }

  /* Fetch All records needed
   */
  async fetchRecords() {
    const cookie = this.cookieService.get(environment.authCookieName);
    const userData = listDocProperties['userData'];

    this.records = await this.apiService.fetchRefRecords(cookie, userData);
  }

  get userDataProperties() {
    return Object.entries(listDocProperties['userData']);
  }

  get receivingContacts() {
    return this.records['receivingContacts'];
  }

  get foreignContacts() {
    return this.records['foreignContacts'];
  }

  get fields() {
    return this.records['fields'];
  }

  get faculties() {
    return this.records['faculties'];
  }
}
