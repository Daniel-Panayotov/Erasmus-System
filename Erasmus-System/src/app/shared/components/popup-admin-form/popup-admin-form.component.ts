import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminPopupService } from 'src/app/services/admin-menu-services/admin-popup.service';
import { docProperties } from 'src/app/types/docProperties';
import { listDocProperties } from '../../environments/environment';

@Component({
  selector: 'app-popup-admin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './popup-admin-form.component.html',
  styleUrl: './popup-admin-form.component.css',
})
export class PopupAdminFormComponent implements OnInit {
  @Input() adminModule: string = '';
  @Input() searchForm: FormGroup = {} as any;
  @Output() popupFormEvent = new EventEmitter<FormGroup>();

  popupForm: FormGroup = {} as any;

  constructor(
    private fb: FormBuilder,
    private popupService: AdminPopupService
  ) {}

  //setup form and send a ref to parent on init
  ngOnInit(): void {
    this.popupForm = this.fb.group({});

    this.addFormControls();

    this.sendPopupForm();
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
  popupFormAction(): void {
    this.popupService.popupFormAction(
      this.adminModule,
      this.popupForm,
      this.searchForm
    );
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
