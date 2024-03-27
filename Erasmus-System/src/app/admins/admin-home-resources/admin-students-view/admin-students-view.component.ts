import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminPopupService } from 'src/app/services/admin-menu-services/admin-popup.service';
import { DeletionService } from 'src/app/services/deletion.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';

@Component({
  selector: 'app-admin-students-view',
  standalone: true,
  imports: [
    PaginationComponent,
    PopupAdminFormComponent,
    AdminStudentsViewComponent,
    CommonModule,
  ],
  templateUrl: './admin-students-view.component.html',
  styleUrl: './admin-students-view.component.css',
})
export class AdminStudentsViewComponent {
  private paginationService = inject(PaginationService);
  private fb = inject(FormBuilder);
  private deletionService = inject(DeletionService);
  private popupService = inject(AdminPopupService);

  adminModule: string = 'users';
  sectionName: string = 'Student accounts';

  popupForm: FormGroup = {} as FormGroup;

  receivePopumForm(popupForm: FormGroup) {
    this.popupForm = popupForm;
  }
}
