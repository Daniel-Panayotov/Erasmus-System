import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  inject,
  HostListener,
  ViewChild,
  ElementRef,
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
import { getRoute } from '../../environments/apiEnvironment';
import { docProperty } from 'src/app/types/docProperties';

export interface refDocs {
  [key: string]: any[];
}

@Component({
  selector: 'app-popup-admin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './popup-admin-form.component.html',
  styleUrl: './popup-admin-form.component.css',
})
export class PopupAdminFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private popupService = inject(AdminPopupService);
  private cookieService = inject(CookieService);

  @Input({ required: true }) adminModule: string = '';
  @Input({ required: true }) sectionName: string = '';
  @Input({ required: true }) searchForm = {} as FormGroup;
  @Output() popupFormEvent = new EventEmitter<FormGroup>();

  popupForm = {} as FormGroup;
  refDocs: refDocs = {};
  filteredRefDocs: refDocs = {};

  @ViewChild('formControl') formRefControl: ElementRef = {} as ElementRef;
  searchSelectName: string = '';
  isSearchLiVisible: boolean = false;

  //setup form and send a ref to parent on init
  async ngOnInit(): Promise<void> {
    this.popupForm = this.fb.group({});
    this.addFormControls();

    this.sendPopupForm();

    this.getRefDocs().then();
  }

  /* When value of input that contains list of referenced values changes
   * Filter the values based on the input
   * and display them as suggestions
   */
  filterControlValues(
    formInput: ElementRef,
    property: [string, docProperty]
  ): void {
    const value: string = formInput.nativeElement.value;
    const docs = this.refDocs[property[1].isRef![1]];

    const filteredDocs: docProperty[] = [];

    for (let doc of docs) {
      if (doc[property[1].isRef![0]].toLowerCase().includes(value)) {
        filteredDocs.push(doc);
      }
    }

    this.filteredRefDocs[property[1].isRef![1]] = filteredDocs;
  }

  /*
   */
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    try {
      if (
        this.formRefControl.nativeElement != event.target &&
        this.isSearchLiVisible
      ) {
        this.toggleSelectLi();
      }
    } catch (err) {}
  }

  changeSelectValue(value: string, control: string): void {
    const values = this.popupForm.value;
    values[control] = value;

    this.popupForm.setValue(values);

    this.toggleSelectLi();
  }

  toggleSelectLi(): void {
    this.isSearchLiVisible = !this.isSearchLiVisible;
  }

  /*
   */
  async getRefDocs(): Promise<void> {
    /* check if there are reference type properties
     * if there are, push the routes they must be fetched from to an array
     */
    const docsToFetch: any[] = [];
    this.iterableDocProperties.map((val): any => {
      if (val[1].isRef) {
        docsToFetch.push(val[1].isRef[1]);
      }
    });

    /* fetch for each item in the array
     * add them to an object - key: route, data: fetched docs
     */
    try {
      for (let doc of docsToFetch) {
        const res = await this.getDocs(doc);
        const { docs } = await res.json();
        this.refDocs[doc] = docs;
      }
    } catch (err) {}
  }

  /* Function to fetch docs with */
  async getDocs(route: string) {
    const authCookie = this.cookieService.get(environment.authCookieName);

    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: authCookie,
      },
    };

    const url = getRoute(route, 'getAll');

    return fetch(url, options);
  }

  //send form to parent
  sendPopupForm(): void {
    this.popupFormEvent.emit(this.popupForm);
  }

  /* Loop an object with the document structure and properties
   * Index it with the given string
   * Setup the form with its prop names and regex
   */
  addFormControls(): void {
    const docProperties = listDocProperties[this.adminModule];

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
    try {
      await this.popupService.popupFormAction(
        this.adminModule,
        this.popupForm,
        this.searchForm
      );
    } catch (err) {
      console.log(err);
    }
  }

  // Allows angular to track the array of items correctly
  trackByFn(index: any, item: any): any {
    return index;
  }

  //getters
  get iterableDocProperties() {
    return Object.entries(listDocProperties[this.adminModule]);
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
