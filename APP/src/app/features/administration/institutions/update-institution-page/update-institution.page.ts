import { Component, inject, input, signal } from '@angular/core';
import { InstitutionForm } from '../institution-form/institution.form';
import { rxResource } from '@angular/core/rxjs-interop';
import { InstitutionService } from '../../services/institution.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { map } from 'rxjs';
import { Institution, InstitutionData } from '../../models/institution.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CanDeactivateFormInterface } from '../../../../core/guards/form.guard';

@Component({
  selector: 'app-update-institution-page',
  imports: [InstitutionForm],
  templateUrl: './update-institution.page.html',
})
export class UpdateInstitutionPage implements CanDeactivateFormInterface {
  private institutionAPI = inject(InstitutionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  institutionID = input.required<number>();

  serverErrors = signal<TreeValidationResult | null>(null);

  canDeactivate = signal(true);

  institutionResource = rxResource({
    params: () => ({ institutionID: this.institutionID() }),
    stream: ({ params }) =>
      this.institutionAPI.GetOne(params.institutionID).pipe(map((v) => v.body as Institution)),
  });

  updateInstitution(data: InstitutionData) {
    const contactIDs = this.institutionResource.value()!.contacts.map((c) => c.contactID);

    this.institutionAPI
      .Update(this.institutionID(), { ...data, contactIDs, facultyIDs: [] })
      .subscribe({
        next: () => {
          this.canDeactivate.set(true);
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error(err: HttpErrorResponse) {
          console.log(err);
        },
      });
  }
}
