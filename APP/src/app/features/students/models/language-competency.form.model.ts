export interface LanguageCompetencyData {
  language: string;
  canFollowLectures: boolean;
  canFollowLecturesWithLessons: boolean;
}

export interface LanguageCompetencyBase extends LanguageCompetencyData {
  languageCompetencyID: number;
}

export interface LanguageCompetencyFormModel extends LanguageCompetencyData {}
