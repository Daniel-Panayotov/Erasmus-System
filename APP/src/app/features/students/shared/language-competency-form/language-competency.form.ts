import {
  Component,
  effect,
  ElementRef,
  input,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  CompetencyLevel,
  LanguageCompetencyFormModel,
} from '../../models/language-competency.model';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  required,
  TreeValidationResult,
} from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-language-competency-form',
  imports: [FormRoot, FormField, MatFormFieldModule, MatSelectModule],
  templateUrl: './language-competency.form.html',
  styleUrl: './language-competency.form.css',
})
export class LanguageCompetencyForm implements OnInit {
  competency = input<LanguageCompetencyFormModel>();
  serverErrors = input<TreeValidationResult | null>();
  certificateUrl = input<string | null>();
  save = output<LanguageCompetencyFormModel>();
  touched = output<boolean>();

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  competencyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  formModel = signal<LanguageCompetencyFormModel>({
    language: '',
    competencyLevel: CompetencyLevel.A1,
    certificate: null,
    canFollowLectures: false,
    canFollowLecturesWithLessons: false,
  });

  competencyForm = form(
    this.formModel,
    (schemaPath) => {
      required(schemaPath.language, { message: 'Language is required.' });
      maxLength(schemaPath.language, 50, {
        message: 'Language has a maximum length of 50 characters.',
      });
    },
    {
      submission: {
        action: async (detail) => {
          if (detail().invalid()) return;

          this.save.emit(detail().value());
        },
      },
    },
  );

  constructor() {
    effect(() => {
      this.touched.emit(this.competencyForm().touched());
    });
  }

  ngOnInit() {
    const competencyData = this.competency();

    if (!competencyData) return;

    this.competencyForm().controlValue.set({ ...competencyData });

    if (competencyData.certificate) {
      const dt = new DataTransfer();
      dt.items.add(competencyData.certificate);
      this.fileInput.nativeElement.files = dt.files;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0] ?? null;

    if (!file) return;
    this.competencyForm.certificate().value.set(file);
  }
}
