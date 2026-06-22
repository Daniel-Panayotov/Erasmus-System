import { Component, inject, signal } from '@angular/core';
import { LanguageCompetencyData } from '../../../models/language-competency.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { LanguageCompetencyForm } from '../../../shared/language-competency-form/language-competency.form';
import { ProfileDraftStore } from '../../profile-draft.store';

@Component({
  selector: 'app-draft-create-competency-page',
  imports: [LanguageCompetencyForm],
  templateUrl: './draft-create-competency.page.html',
  styleUrl: './draft-create-competency.page.css',
})
export class DraftCreateCompetencyPage {
  private draftStore = inject(ProfileDraftStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  serverErrors = signal<TreeValidationResult | null>(null);

  createCompetency(data: LanguageCompetencyData) {
    this.draftStore.competenciesDraft.update((v) => {
      const competencies = v;
      competencies.push(data);
      return competencies;
    });

    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
