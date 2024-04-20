import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminPopupService } from 'src/app/services/admin-menu-services/admin-popup.service';
import { environment, listDocProperties } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { DropdownComponent } from '../dropdown/dropdown.component';
import {
  adminRecordUnion,
  generalAdminComponentInputs,
} from 'src/app/types/adminDocs';
import { apiModuleString } from 'src/app/types/apiEnvironmentTypes';
import { ApiService } from 'src/app/services/general-services/api.service';
import { PaginationService } from 'src/app/services/pagination.service';

export interface refDocs {
  [key: string]: adminRecordUnion[];
}

@Component({
  selector: 'app-popup-admin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent],
  templateUrl: './popup-admin-form.component.html',
  styleUrl: './popup-admin-form.component.css',
})
export class PopupAdminFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private popupService = inject(AdminPopupService);
  private cookieService = inject(CookieService);
  private apiService = inject(ApiService);
  private paginationService = inject(PaginationService);

  @Input({ required: true }) componentInputs =
    {} as generalAdminComponentInputs;
  @Output() popupFormEvent = new EventEmitter<FormGroup>();

  popupForm = {} as FormGroup;
  refDocs: refDocs = {};

  //setup form and send a ref to parent on init
  async ngOnInit(): Promise<void> {
    this.popupForm = this.fb.group({});

    this.addFormControls();
    this.sendPopupForm();

    await this.getRefDocs();
  }

  private async getRefDocs(): Promise<void> {
    /* check if there are reference type properties
     * if there are, push the routes they must be fetched from to an array
     */
    const docsToFetch: apiModuleString[] = [];
    this.iterableDocProperties.map((val) => {
      if (val[1].isRef) {
        docsToFetch.push(val[1].isRef.apiSection);
      }
    });

    /* fetch for each item in the array
     * add them to an object - key: route, data: fetched docs
     */
    const cookie = this.cookieService.get(environment.authCookieName);

    try {
      for (let docName of docsToFetch) {
        const res = await this.apiService.getAllForRecordType(cookie, docName);
        const { docs } = await res.json();
        this.refDocs[docName] = docs;
      }
    } catch (err) {}
  }

  //send form to parent
  sendPopupForm(): void {
    this.popupFormEvent.emit(this.popupForm);
  }

  /* Loop an object with the document structure and properties
   * Index it with the given string
   * Setup the form with its prop names and regex
   */
  private addFormControls(): void {
    const docProperties = listDocProperties[this.componentInputs.adminModule];

    for (let propertyName in docProperties) {
      const propertyRegex = docProperties[propertyName].regex;

      this.popupForm.addControl(
        propertyName,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(propertyRegex),
        ])
      );
    }
  }

  //function the form calls on submit event
  async popupFormAction(): Promise<void> {
    await this.popupService.popupFormAction(
      this.componentInputs.adminModule,
      this.popupForm
    );

    await this.componentInputs.changePage(
      this.paginationService.page,
      this.paginationService.isSearchActive
    );
  }

  //getters
  get iterableDocProperties() {
    return Object.entries(listDocProperties[this.componentInputs.adminModule]);
  }
  get isPopupVisible(): boolean {
    return this.popupService.isPopupVisible;
  }
  get isPopupEdit(): boolean {
    return this.popupService.isPopupEdit;
  }
  get popupIndex(): number {
    return this.popupService.popupIndex;
  }
  get popupError(): string {
    return this.popupService.popupError;
  }
}
