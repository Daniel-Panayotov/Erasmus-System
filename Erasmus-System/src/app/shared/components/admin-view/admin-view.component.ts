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
import { PaginationService } from 'src/app/services/pagination.service';
import { listDocProperties } from '../../environments/environment';
import { generalAdminComponentInputs } from 'src/app/types/adminDocs';
import { TableButtonsData } from 'src/app/types/adminTableButtons';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css',
})
export class AdminViewComponent implements OnInit, OnDestroy {
  private paginationService = inject(PaginationService);
  private popupService = inject(AdminPopupService);
  private fb = inject(FormBuilder);

  @Input({ required: true }) popupForm = {} as FormGroup;
  @Input({ required: true }) componentInputs =
    {} as generalAdminComponentInputs;
  @Input({ required: true }) tableButtonsData = {} as TableButtonsData;
  @Output() searchFormEvent = new EventEmitter<FormGroup>();
  @Output() populateListOfClickedDataEvent = new EventEmitter<() => void>();

  @ViewChild('selectBtn') selectBtn: ElementRef = {} as ElementRef;
  searchSelectName: string = '--- Choose Filter ---';
  isSearchLiVisible: boolean = false;

  listOfClickedData: boolean[][] = [];

  async ngOnInit() {
    this.sendSearchForm();
    this.sendPopulateFunction();
    await this.componentInputs.changePage(1, false);
  }

  ngOnDestroy(): void {
    this.popupService.resetState();
    this.paginationService.resetState();
  }

  /*----------------
  | Event emmiters |
  ----------------*/

  sendSearchForm(): void {
    this.searchFormEvent.emit(this.searchForm);
  }

  sendPopulateFunction(): void {
    this.populateListOfClickedDataEvent.emit(
      this.populateListOfClickedData.bind(this)
    );
  }

  /*---------
  | Actions |
  ---------*/

  togglePopup(isEdit: boolean, i: number) {
    this.popupService.togglePopup(
      isEdit,
      i,
      this.popupForm,
      this.componentInputs.adminModule
    );
  }

  /*------------------------
  | Search form & dropdown |
  ------------------------*/
  searchForm = this.fb.group({
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

    const { search } = this.searchForm.value;
    if (typeof search != 'string') {
      return;
    }
    const values = { search, select: value };

    this.searchForm.setValue(values);

    this.toggleSelectLi();
  }

  toggleSelectLi(): void {
    this.isSearchLiVisible = !this.isSearchLiVisible;
  }

  /*------------------
  | Table data popup |
  ------------------*/

  toggleTdPopup(outerIndex: number, innerIndex: number) {
    this.listOfClickedData[outerIndex][innerIndex] =
      !this.listOfClickedData[outerIndex][innerIndex];
  }

  /* Loop through each record and its properties */
  populateListOfClickedData() {
    for (let outerI = 0; outerI < this.documents.length; outerI++) {
      this.listOfClickedData[outerI] = [];
      for (let innerI = 0; innerI < this.docProperty.length; innerI++) {
        this.listOfClickedData[outerI][innerI] = false;
      }
    }
  }

  /*---------
  | Getters |
  ---------*/

  get docProperty() {
    return Object.entries(listDocProperties[this.componentInputs.adminModule]);
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
