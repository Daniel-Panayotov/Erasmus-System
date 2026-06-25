import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { TreeValidationResult } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageCompetencyData } from '../../../models/language-competency.model';
import { LanguageCompetencyForm } from '../../../shared/language-competency-form/language-competency.form';
import { ProfileDraftStore } from '../../profile-draft.store';

@Component({
  selector: 'app-draft-update-competency-page',
  imports: [LanguageCompetencyForm],
  templateUrl: './draft-update-competency.page.html',
})
export class DraftUpdateCompetencyPage implements OnInit {
  private draftStore = inject(ProfileDraftStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userID = input.required<number>();
  competencyIndex = input.required<number>();
  serverErrors = signal<TreeValidationResult | null>(null);

  competency = computed(() => this.draftStore.competenciesDraft()[this.competencyIndex()]);

  ngOnInit() {
    if (this.draftStore.competenciesDraft().length <= this.competencyIndex())
      this.router.navigate(['../..'], { relativeTo: this.route });
  }

  updateCompetency(data: LanguageCompetencyData) {
    this.draftStore.competenciesDraft.update((list) => {
      list[this.competencyIndex()] = data;

      return [...list];
    });

    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
