import { Component, inject, input, signal } from '@angular/core';
import { LanguageCompetencyData } from '../../../models/language-competency.model';
import { LanguageCompetencyService } from '../../../services/language-competency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { LanguageCompetencyForm } from '../../../shared/language-competency-form/language-competency.form';

@Component({
  selector: 'app-create-competency-page',
  imports: [LanguageCompetencyForm],
  templateUrl: './create-competency.page.html',
})
export class CreateCompetencyPage {
  private languageAPI = inject(LanguageCompetencyService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  studentID = input.required<number>();

  serverErrors = signal<TreeValidationResult | null>(null);

  createCompetency(data: LanguageCompetencyData) {
    this.languageAPI.Create(this.studentID(), data).subscribe({
      next: () => this.router.navigate(['..'], { relativeTo: this.route }),
      error(err: HttpErrorResponse) {},
    });
  }
}
