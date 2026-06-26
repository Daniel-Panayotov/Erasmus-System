import { Component, inject, input, signal } from '@angular/core';
import { InstitutionForm } from '../../shared/institution-form/institution.form';
import { rxResource } from '@angular/core/rxjs-interop';
import { InstitutionService } from '../../services/institution.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { map } from 'rxjs';
import { InstitutionBase, InstitutionData } from '../../models/institution.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-institution-page',
  imports: [InstitutionForm],
  templateUrl: './update-institution.page.html',
})
export class UpdateInstitutionPage {
  private institutionAPI = inject(InstitutionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  institutionID = input.required<number>();

  serverErrors = signal<TreeValidationResult | null>(null);

  institutionResource = rxResource({
    params: () => ({ institutionID: this.institutionID() }),
    stream: ({ params }) =>
      this.institutionAPI.GetOne(params.institutionID).pipe(map((v) => v.body as InstitutionBase)),
  });

  updateInstitution(data: InstitutionData) {
    this.institutionAPI.Update(this.institutionID(), data).subscribe({
      next: () => this.router.navigate(['..'], { relativeTo: this.route }),
      error(err: HttpErrorResponse) {
        console.log(err);
      },
    });
  }
}
