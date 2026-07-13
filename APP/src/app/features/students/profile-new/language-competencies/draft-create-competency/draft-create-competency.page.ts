import { Component, inject, signal } from '@angular/core';
import { LanguageCompetencyFormModel } from '../../../models/language-competency.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeValidationResult } from '@angular/forms/signals';
import { LanguageCompetencyForm } from '../../../shared/language-competency-form/language-competency.form';
import { ProfileDraftStore } from '../../profile-draft.store';

@Component({
  selector: 'app-draft-create-competency-page',
  imports: [LanguageCompetencyForm],
  templateUrl: './draft-create-competency.page.html',
})
export class DraftCreateCompetencyPage {
  private draftStore = inject(ProfileDraftStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  serverErrors = signal<TreeValidationResult | null>(null);

  createCompetency(data: LanguageCompetencyFormModel) {
    this.draftStore.competenciesDraft.update((v) => {
      const competencies = v;
      competencies.push(data);
      return competencies;
    });

    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
