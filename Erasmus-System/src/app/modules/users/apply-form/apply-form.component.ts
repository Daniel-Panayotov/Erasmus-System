import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { NavigationComponent } from 'src/app/core/navigation/navigation.component';
import { ApiService } from 'src/app/services/general-services/api.service';
import { AuthService } from 'src/app/services/general-services/auth.service';
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
  mobilitiesRegex,
} from 'src/app/shared/environments/validationEnvironment';
import { adminRecords } from 'src/app/types/adminDocs';
import { apiModuleString } from 'src/app/types/apiEnvironmentTypes';
import { apiUrl } from 'src/app/shared/environments/apiEnvironment';
import { ApplicationsService } from 'src/app/services/applications.service';
import { Router } from '@angular/router';

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
  private authService = inject(AuthService);
  private applicationService = inject(ApplicationsService);
  private router = inject(Router);

  cookie = '';
  records = {} as adminRecords;
  apiModule: apiModuleString = 'usersData';

  async ngOnInit(): Promise<void> {
    await this.fetchRecords();
  }

  constructor() {
    this.authService.authCookieSubject$
      .pipe(takeUntilDestroyed())
      .subscribe({ next: (givenCookie) => (this.cookie = givenCookie) });
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
    address: [
      '',
      [Validators.required, Validators.pattern(globalRegex.normalSentences)],
    ],
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
      [Validators.required, Validators.pattern(fieldsRegex.code)],
    ],
    mobilityRef: [
      '',
      [Validators.required, Validators.pattern(mobilitiesRegex.code)],
    ],
    sendingContactRef: [
      '',
      [Validators.required, Validators.pattern(globalRegex.emailRegex)],
    ],
    sendingFaculty: [
      '',
      [Validators.required, Validators.pattern(facultiesRegex.facultyName)],
    ],
    receivingFacultyRef: [
      '',
      [Validators.required, Validators.pattern(facultiesRegex.facultyName)],
    ],
    receivingContactRef: [
      '',
      [Validators.required, Validators.pattern(globalRegex.emailRegex)],
    ],
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
    visitReason: [
      '',
      [Validators.required, Validators.pattern(globalRegex.normalSentences)],
    ],
    motherLanguage: [
      '',
      [Validators.required, Validators.pattern(globalRegex.word)],
    ],
    //
    homeLanguage: ['', [Validators.pattern(globalRegex.word)]],
    studyDegree: [
      '',
      [Validators.required, Validators.pattern(userDataRegex.studyDegree)],
    ],
    studyYears: [
      '',
      [Validators.required, Validators.pattern(userDataRegex.studyYears)],
    ],
    priorStudyErasmus: [
      '',
      [Validators.required, Validators.pattern(globalRegex.yes_no)],
    ],
    priorStudyMonths: [
      '',
      [Validators.required, Validators.pattern(userDataRegex.priorStudyMonths)],
    ],
    file: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.applyForm.invalid) return;

    const { pdfBytes, error: error2 } =
      await this.applicationService.createPdfFromForm(
        this.applyForm,
        this.records
      );

    if (error2) return;

    const { academicYearFrom, academicYearTo } = this.applyForm.value;

    const blob = new Blob([pdfBytes as Uint8Array]);

    const formData = new FormData();
    formData.append('file', blob, 'application.pdf');
    formData.append('academicYear', `${academicYearFrom} - ${academicYearTo}`);

    try {
      await fetch(apiUrl + '/applications/createOne', {
        method: 'POST',
        headers: {
          [environment.authCookieName]: this.cookie,
        },
        body: formData,
      });

      await this.router.navigate(['/home']);
    } catch (err: any) {
      console.log(await err.json());
    }

    // await this.apiService.createOne(
    //   this.cookie,
    //   validatedValues,
    //   this.apiModule
    // );
  }

  populateForm() {
    this.applyForm.patchValue({
      firstName: 'Daniel',
      lastName: 'Panayotov',
      birthDate: '03/11/2004',
      sex: 'male',
      birthPlace: 'Ruse',
      nationality: 'Bulgaria',
      address: 'some address',
      phone: '0894511049',
      academicYearFrom: '2023',
      academicYearTo: '2027',
      mobilityType: 'traineeship',
      semesterSeason: 'year',
      fieldOfStudyRef: '001',
      mobilityRef: 'BG RUSE 01',
      sendingContactRef: 'ivan@abv.bg',
      sendingFaculty: 'EEA',
      receivingFacultyRef: 'Electronics and automation',
      receivingContactRef: 'alex123@abv.bg',
      studyFrom: '01/01/2024',
      studyTo: '01/03/2024',
      accommodation: 'no',
      stayFrom: '01/01/2024',
      stayTo: '01/03/2024',
      bulgarianCourse: 'no',
      visitReason: 'I wish to learn.',
      motherLanguage: 'Bulgarian',
      homeLanguage: 'Bulgarian',
      studyDegree: 'Bachelor',
      studyYears: '1',
      priorStudyErasmus: 'no',
      priorStudyMonths: '6',
    });
  }

  /* Fetch All records needed
   */
  async fetchRecords() {
    const userData = listDocProperties[this.apiModule];

    this.records = await this.apiService.fetchRefRecords(this.cookie, userData);
  }

  get userDataProperties() {
    return Object.entries(listDocProperties[this.apiModule]);
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

  get mobilities() {
    return this.records['mobilities'];
  }
}
