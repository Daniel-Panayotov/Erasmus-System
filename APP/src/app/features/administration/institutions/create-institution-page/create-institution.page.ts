import { Component, computed, inject, signal } from '@angular/core';
import { InstitutionForm } from '../institution-form/institution.form';
import { InstitutionService } from '../../services/institution.service';
import { Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import {
  InstitutionData,
  InstitutionFormModel,
  SaveInstitution,
} from '../../models/institution.model';
import { administrationPaths } from '../../administration.paths';

@Component({
  selector: 'app-create-institution-page',
  imports: [InstitutionForm],
  templateUrl: './create-institution.page.html',
})
export class CreateInstitutionPage {
  private institutionAPI = inject(InstitutionService);
  // private draftStore = inject(ContactDraftStore);
  private router = inject(Router);

  serverErrors = signal<TreeValidationResult | null>(null);

  institution = computed(() => null);

  valueChange(data: InstitutionFormModel) {
    // this.draftStore.contact.set(data);
  }

  //TODO
  createInstitution(data: InstitutionData) {
    // const institutionID = this.draftStore.institution()?.institutionID ?? null;

    const body: SaveInstitution = { ...data, contactIDs: [], facultyIDs: [] };

    this.institutionAPI.Create(body).subscribe({
      next: (v) => this.router.navigate(administrationPaths.institutions.view),
      error(err) {},
    });
  }
}
