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
import { administrationPaths } from '../../administration.paths';
import { InstitutionsStore } from '../institutions.store';

@Component({
  selector: 'app-create-institution-page',
  imports: [InstitutionForm],
  templateUrl: './create-institution.page.html',
})
export class CreateInstitutionPage {
  private institutionAPI = inject(InstitutionService);
  private draftStore = inject(InstitutionsStore);
  private router = inject(Router);

  serverErrors = signal<TreeValidationResult | null>(null);

  institution = this.draftStore.institutionModel;

  valueChange(data: InstitutionFormModel) {
    this.draftStore.institutionModel.set(data);
  }

  //TODO: Faculty IDs
  createInstitution(data: InstitutionData) {
    const contacts = this.draftStore.contacts();

    const body: SaveInstitution = {
      ...data,
      contactIDs: contacts.map((c) => c.contactID),
      facultyIDs: [],
    };

    this.institutionAPI.Create(body).subscribe({
      next: (v) => this.router.navigate(administrationPaths.institutions.view),
      error(err) {},
    });
  }
}
