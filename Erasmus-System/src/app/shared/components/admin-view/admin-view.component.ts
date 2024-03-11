import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminPopupService } from 'src/app/services/admin-menu-services/admin-popup.service';
import { DeletionService } from 'src/app/services/deletion.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { Faculty, Fields } from 'src/app/types/adminDocs';
import { searchValue } from 'src/app/types/searchFormValue';
import { listDocProperties } from '../../environments/environment';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css',
})
export class AdminViewComponent implements OnInit, OnDestroy {
  @Input() adminModule: string = '';
  @Input() sectionName: string = '';
  @Input() popupForm: FormGroup = {} as any;
  @Output() searchFormEvent = new EventEmitter<FormGroup>();

  constructor(
    private paginationService: PaginationService,
    private fb: FormBuilder,
    private deletionService: DeletionService,
    private popupService: AdminPopupService
  ) {}

  ngOnInit(): void {
    this.sendSearchForm();
  }

  ngOnDestroy(): void {
    this.popupService.resetState();
    this.paginationService.resetState();
  }
  // send form reference to parent
  sendSearchForm(): void {
    this.searchFormEvent.emit(this.searchFieldForm);
  }

  /* Bind functions */

  async changePage(pageNumber: number, searching: boolean): Promise<void> {
    await this.paginationService.changePage.bind(
      this.paginationService, // original context
      pageNumber,
      searching,
      this.searchFieldForm.value as searchValue,
      this.adminModule
    )();
  }

  async deleteField(id: string): Promise<void> {
    await this.deletionService.onDelete.bind(
      this.deletionService,
      id,
      this.adminModule,
      this.changePage.bind(this, 1, this.isSearchActive)
    )();
  }

  togglePopup(isEdit: boolean, i: number) {
    this.popupService.togglePopup(isEdit, i, this.popupForm, this.adminModule);
  }

  /* search form */

  searchFieldForm = this.fb.group({
    search: [''],
    select: ['', Validators.required],
  });

  get docProperty() {
    return Object.entries(listDocProperties[this.adminModule]);
  }

  /* pagination getters */
  get documents(): [any] {
    return this.paginationService.documents;
  }

  get isSearchActive(): boolean {
    return this.paginationService.isSearchActive;
  }

  /* popup form getters */
  get isPopupVisible(): boolean {
    return this.popupService.isPopupVisible;
  }
  get isPopupEdit(): boolean {
    return this.popupService.isPopupEdit;
  }
  get popupIndex(): number {
    return this.popupService.popupIndex;
  }
}
