import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
  inject,
  HostListener,
  ElementRef,
  ViewChild,
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
import { searchValue } from 'src/app/types/searchFormValue';
import { listDocProperties } from '../../environments/environment';
import { adminSectionString } from 'src/app/types/apiEnvironmentTypes';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css',
})
export class AdminViewComponent implements OnInit, OnDestroy {
  private paginationService = inject(PaginationService);
  private fb = inject(FormBuilder);
  private deletionService = inject(DeletionService);
  private popupService = inject(AdminPopupService);

  @Input({ required: true }) adminModule = '' as adminSectionString;
  @Input({ required: true }) sectionName: string = '';
  @Input({ required: true }) popupForm = {} as FormGroup;
  @Output() searchFormEvent = new EventEmitter<FormGroup>();

  @ViewChild('selectBtn') selectBtn: ElementRef = {} as ElementRef;
  searchSelectName: string = '--- Choose Filter ---';
  isSearchLiVisible: boolean = false;

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
      this.deletionService, // original context
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

  /* Add event Listener to close ul if clicked outside
   */
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (
      event.target != this.selectBtn.nativeElement &&
      this.isSearchLiVisible
    ) {
      this.toggleSelectLi();
    }
  }

  /* When li is clicked update formControl value
   * and update button name to reflect value
   */
  changeSelectValue(value: string, valueName: string): void {
    this.searchSelectName = valueName;

    const { search } = this.searchFieldForm.value;
    if (typeof search != 'string') {
      return;
    }
    const values = { search, select: value };

    this.searchFieldForm.setValue(values);

    this.toggleSelectLi();
  }

  toggleSelectLi(): void {
    this.isSearchLiVisible = !this.isSearchLiVisible;
  }

  get docProperty() {
    return Object.entries(listDocProperties[this.adminModule]);
  }

  /* pagination getters */
  get documents(): any[] {
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
