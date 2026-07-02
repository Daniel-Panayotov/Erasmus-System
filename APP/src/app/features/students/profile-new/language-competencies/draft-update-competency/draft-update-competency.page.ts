import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { TreeValidationResult } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageCompetencyData } from '../../../models/language-competency.model';
import { LanguageCompetencyForm } from '../../../shared/language-competency-form/language-competency.form';
import { ProfileDraftStore } from '../../profile-draft.store';
import { CanDeactivateFormInterface } from '../../../../../core/guards/form.guard';

@Component({
  selector: 'app-draft-update-competency-page',
  imports: [LanguageCompetencyForm],
  templateUrl: './draft-update-competency.page.html',
})
export class DraftUpdateCompetencyPage implements OnInit, CanDeactivateFormInterface {
  private draftStore = inject(ProfileDraftStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userID = input.required<number>();
  competencyIndex = input.required<number>();
  serverErrors = signal<TreeValidationResult | null>(null);

  canDeactivate = signal(true);

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

    this.canDeactivate.set(true);
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
