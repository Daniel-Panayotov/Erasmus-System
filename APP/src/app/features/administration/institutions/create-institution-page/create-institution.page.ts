import { Component, inject, signal } from '@angular/core';
import { InstitutionForm } from '../institution-form/institution.form';
import { InstitutionService } from '../../services/institution.service';
import { Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import {
  InstitutionData,
  InstitutionFormModel,
  SaveInstitution,
} from '../../models/institution.model';
import { administration } from '../../administration.paths';
import { InstitutionsStore } from '../institutions.store';

@Component({
  selector: 'app-create-institution-page',
  imports: [InstitutionForm],
  templateUrl: './create-institution.page.html',
})
export class CreateInstitutionPage {
  private institutionAPI = inject(InstitutionService);
  private institutionsStore = inject(InstitutionsStore);
  private router = inject(Router);

  serverErrors = signal<TreeValidationResult | null>(null);

  institution = this.institutionsStore.drafts.institutionModel;
  draftTouched = this.institutionsStore.drafts.touched;

  changeTouched(touched: boolean) {
    if (this.draftTouched()) return;
    this.draftTouched.set(touched);
  }
  valueChange(data: InstitutionFormModel) {
    if (!this.draftTouched()) return;
    this.institutionsStore.drafts.institutionModel.set(data);
  }

  //TODO: Faculty IDs
  createInstitution(data: InstitutionData) {
    const contacts = this.institutionsStore.drafts.contacts();

    const body: SaveInstitution = {
      ...data,
      contactIDs: contacts.map((c) => c.contactID),
      facultyIDs: [],
    };

    this.institutionAPI.Create(body).subscribe({
      next: (v) => {
        this.institutionsStore.resetDrafts();
        this.router.navigate(administration.institutions.view.segments);
      },
      error(err) {},
    });
  }
}
