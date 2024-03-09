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

  ngOnInit(): void {
    this.popupForm = this.fb.group({});

    this.addFormControls();

    this.sendPopupForm();
  }

  sendPopupForm() {
    this.popupFormEvent.emit(this.popupForm);
  }

  addFormControls(): void {
    const docProperty = this.docProperties[this.adminModule];

    for (let property in docProperty) {
      const propertyName = docProperty[property].name;
      const propertyRegex = docProperty[property].regex;

      this.popupForm.addControl(
        propertyName,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(propertyRegex),
        ])
      );
    }
  }

  popupFormAction() {
    this.popupService.popupFormAction(
      this.adminModule,
      this.popupForm,
      this.searchForm
    );
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  get iterableDocProperties() {
    return Object.entries(this.docProperties[this.adminModule]);
  }

  get docProperties(): docProperties {
    return this.popupService.docProperties;
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
